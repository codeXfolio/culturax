import { PrismaClient } from '../generated/prisma';
import { rm } from 'fs/promises';
import { join } from 'path';

const prisma = new PrismaClient();

async function truncate() {
  try {
    console.log('🗑️ Starting database truncation...');

    // Delete all files in uploads directory
    const uploadsDir = join(process.cwd(), 'uploads');
    try {
      await rm(uploadsDir, { recursive: true, force: true });
      console.log('✅ Uploads directory cleared');
    } catch (error) {
      console.log('ℹ️ Uploads directory not found or already empty');
    }

    // Delete all data in reverse order of dependencies
    await prisma.feedPostLike.deleteMany();
    console.log('✅ Feed post likes deleted');

    await prisma.feedPostComment.deleteMany();
    console.log('✅ Feed post comments deleted');

    await prisma.feedPost.deleteMany();
    console.log('✅ Feed posts deleted');

    await prisma.subscription.deleteMany();
    console.log('✅ Subscriptions deleted');

    await prisma.monetizationSettings.deleteMany();
    console.log('✅ Monetization settings deleted');

    await prisma.collection.deleteMany();
    console.log('✅ Collections deleted');

    await prisma.social.deleteMany();
    console.log('✅ Social links deleted');

    await prisma.follow.deleteMany();
    console.log('✅ Follow relationships deleted');

    await prisma.transaction.deleteMany();
    console.log('✅ Transactions deleted');

    await prisma.user.deleteMany();
    console.log('✅ Users deleted');

    console.log('✨ Database truncation completed successfully!');
  } catch (error) {
    console.error('❌ Error during truncation:', error);
  } finally {
    await prisma.$disconnect();
  }
}

truncate();
