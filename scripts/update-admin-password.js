const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

async function main() {
  const rawPassword = '225211.10';
  const encryptedHash = hashPassword(rawPassword);

  console.log('Generating encrypted hash for password:', rawPassword);
  console.log('Encrypted Hash:', encryptedHash);

  // Get Super Admin or Admin role
  let adminRole = await prisma.role.findFirst({
    where: {
      OR: [{ name: 'SUPER_ADMIN' }, { name: 'ADMIN' }]
    }
  });

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'SUPER_ADMIN',
        description: 'مدير النظام الأعلى كامل الصلاحيات'
      }
    });
  }

  // Update or create admin@yemeni-guide.com
  const admin1 = await prisma.user.upsert({
    where: { email: 'admin@yemeni-guide.com' },
    update: {
      passwordHash: encryptedHash,
      roleId: adminRole.id,
      fullName: 'المشرف العام للمنصة (محسن العريقي)',
      isVerified: true
    },
    create: {
      email: 'admin@yemeni-guide.com',
      fullName: 'المشرف العام للمنصة (محسن العريقي)',
      passwordHash: encryptedHash,
      roleId: adminRole.id,
      isVerified: true
    }
  });

  // Also update or create admin@resident-guide.sa so both work seamlessly
  const admin2 = await prisma.user.upsert({
    where: { email: 'admin@resident-guide.sa' },
    update: {
      passwordHash: encryptedHash,
      roleId: adminRole.id,
      fullName: 'مدير منصة دليل المقيم',
      isVerified: true
    },
    create: {
      email: 'admin@resident-guide.sa',
      fullName: 'مدير منصة دليل المقيم',
      passwordHash: encryptedHash,
      roleId: adminRole.id,
      isVerified: true
    }
  });

  console.log('✓ Successfully updated admin users in database:');
  console.log('  1.', admin1.email, '-> Encrypted hash stored.');
  console.log('  2.', admin2.email, '-> Encrypted hash stored.');
}

main()
  .catch((e) => {
    console.error('Error updating admin password:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
