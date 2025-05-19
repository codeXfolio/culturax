// @ts-nocheck
import { PrismaClient } from '../generated/prisma';
import { join } from 'path';
import { copyFile, mkdir, writeFile } from 'fs/promises';
import crypto from 'crypto';
import { readdir } from 'fs/promises';

const prisma = new PrismaClient();

const CREATORS = [
  {
    name: 'Sarah Johnson',
    username: 'sarahj',
    email: 'sarah.johnson@example.com',
    bio: 'Digital artist and content creator passionate about sharing my creative journey',
    avatar:
      'https://pbs.twimg.com/profile_images/1893803697185910784/Na5lOWi5_400x400.jpg',
    coverImage:
      'https://pbs.twimg.com/profile_banners/44196397/1739948056/1500x500',
  },
  {
    name: 'Michael Chen',
    username: 'michaelc',
    email: 'michael.chen@example.com',
    bio: 'Photography enthusiast capturing moments that tell stories',
    avatar:
      'https://pbs.twimg.com/profile_images/1648457115126620160/jGEIHv6j_400x400.jpg',
    coverImage:
      'https://pbs.twimg.com/profile_banners/1356563031438680067/1622010536/600x200',
  },
  {
    name: 'Emma Rodriguez',
    username: 'emmar',
    email: 'emma.rodriguez@example.com',
    bio: 'Travel blogger exploring hidden gems and sharing local experiences',
    avatar:
      'https://pbs.twimg.com/profile_images/1676527368008073217/0zXnASfM_400x400.jpg',
    coverImage:
      'https://pbs.twimg.com/profile_banners/166739404/1688550249/1500x500',
    featured: true,
  },
  {
    name: 'Alex Thompson',
    username: 'alext',
    email: 'alex.thompson@example.com',
    bio: 'Music producer and DJ sharing my creative process and latest tracks',
    avatar:
      'https://pbs.twimg.com/profile_images/1842418655537352704/wAqbvEak_400x400.jpg',
    coverImage:
      'https://pbs.twimg.com/profile_banners/851277718368829443/1711791962/1500x500',
    featured: true,
  },
  {
    name: 'Sophia Lee',
    username: 'sophial',
    email: 'sophia.lee@example.com',
    bio: 'Fashion designer showcasing my latest collections and design process',
    avatar:
      'https://pbs.twimg.com/profile_images/701284466023485440/Ds24Whb8_400x400.jpg',
    coverImage:
      'https://pbs.twimg.com/profile_banners/106658148/1722706112/1500x500',
    featured: true,
  },
];

const REGULAR_USERS = [
  {
    name: 'David Wilson',
    username: 'davidw',
    email: 'david.wilson@example.com',
    bio: 'Tech enthusiast and photography hobbyist',
    avatar: 'https://placehold.co/150x150',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    name: 'Lisa Thompson',
    username: 'lisat',
    email: 'lisa.thompson@example.com',
    bio: 'Art lover and aspiring painter',
    avatar: 'https://placehold.co/150x150',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    name: 'James Miller',
    username: 'jamesm',
    email: 'james.miller@example.com',
    bio: 'Coffee enthusiast and amateur photographer',
    avatar: 'https://placehold.co/150x150',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    name: 'Olivia Brown',
    username: 'oliviab',
    email: 'olivia.brown@example.com',
    bio: 'Book lover and aspiring writer',
    avatar: 'https://placehold.co/150x150',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    name: 'Robert Garcia',
    username: 'robertg',
    email: 'robert.garcia@example.com',
    bio: 'Fitness enthusiast and lifestyle blogger',
    avatar: 'https://placehold.co/150x150',
    coverImage: 'https://placehold.co/1200x400',
  },
];

const FEED_POSTS = [
  {
    caption:
      'Just finished this digital painting! Took me about 12 hours to complete. What do you think? 🎨✨',
    isPremium: false,
  },
  {
    caption:
      'Behind the scenes of my latest photoshoot! The lighting was perfect today 🌅',
    isPremium: true,
  },
  {
    caption:
      'Exploring the hidden streets of Kyoto. The traditional architecture here is absolutely breathtaking! 🇯🇵',
    isPremium: false,
  },
  {
    caption:
      'My new collection is now available! Check out the link in my bio for exclusive access 🎭',
    isPremium: true,
  },
  {
    caption:
      'Morning coffee and creative vibes ☕️ Working on something special for my subscribers!',
    isPremium: true,
  },
  {
    caption:
      "New track dropping next week! Here's a sneak peek of the studio session 🎵",
    isPremium: false,
  },
  {
    caption:
      'Just wrapped up my latest fashion shoot! The new collection is inspired by urban street art 🎨',
    isPremium: true,
  },
  {
    caption:
      'Found this amazing little café in Tokyo. The matcha here is incredible! 🍵',
    isPremium: false,
  },
  {
    caption:
      'Working on a new series of landscape paintings. This one is inspired by the mountains of Switzerland 🏔️',
    isPremium: true,
  },
  {
    caption:
      "Behind the scenes of our latest music video shoot! Can't wait to share the final result 🎬",
    isPremium: true,
  },
  {
    caption:
      'Just finished my morning run along the beach. Nothing beats starting the day with a sunrise jog 🏃‍♂️',
    isPremium: false,
  },
  {
    caption:
      "New chapter of my book is coming along nicely! Here's a little teaser for my subscribers 📚",
    isPremium: true,
  },
  {
    caption:
      'Exploring the local markets in Bangkok. The street food here is absolutely amazing! 🍜',
    isPremium: false,
  },
  {
    caption:
      'Working on some new designs for the upcoming fashion week. What do you think of these sketches? ✏️',
    isPremium: true,
  },
  {
    caption:
      'Just finished recording my new podcast episode about creative inspiration. Available for subscribers tomorrow! 🎙️',
    isPremium: true,
  },
];

const COMMENTS = [
  'This is amazing! The colors are so vibrant!',
  'Love the composition! Where was this taken?',
  'Your work always inspires me!',
  'The details are incredible!',
  'Can you share your process?',
  'This makes me want to travel there!',
  'The lighting is perfect!',
  'You have such a unique style!',
  'This is my favorite piece of yours!',
  'The atmosphere in this photo is magical!',
  "I can't wait to see more of this series!",
  'The attention to detail is stunning!',
  'This gives me so much inspiration!',
  'Your creativity knows no bounds!',
  'I love how you captured this moment!',
  'The colors in this are absolutely perfect!',
  'This is next level! 🔥',
  "I'm speechless! This is incredible!",
  "You've outdone yourself with this one!",
  'The mood in this is just perfect!',
  'I can feel the energy in this piece!',
  'This is so inspiring! Thank you for sharing!',
  'The composition is absolutely flawless!',
  "I'm in awe of your talent!",
  'This is pure magic! ✨',
];

const COLLECTIONS = [
  {
    title: 'Urban Landscapes',
    description:
      'A collection of cityscapes and urban photography capturing the essence of modern life',
    tags: 'photography, urban, city, architecture',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    title: 'Digital Art Series',
    description:
      'My latest digital art collection featuring surreal landscapes and dreamlike scenes',
    tags: 'digital art, surreal, fantasy, illustration',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    title: 'Travel Diaries',
    description:
      'Documenting my journey through Asia, capturing local culture and hidden gems',
    tags: 'travel, asia, culture, photography',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    title: 'Music Production',
    description:
      'Behind the scenes of my music production process and studio sessions',
    tags: 'music, production, studio, behind the scenes',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    title: 'Fashion Design',
    description:
      'My latest fashion designs and collections, from sketch to runway',
    tags: 'fashion, design, runway, style',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    title: "Nature's Beauty",
    description: 'Capturing the raw beauty of nature in its most pristine form',
    tags: 'nature, landscape, wildlife, photography',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    title: 'Creative Process',
    description: 'A deep dive into my creative process and artistic journey',
    tags: 'art, process, behind the scenes, creative',
    coverImage: 'https://placehold.co/1200x400',
  },
  {
    title: 'Street Photography',
    description: 'Candid moments and stories from the streets around the world',
    tags: 'street, photography, candid, documentary',
    coverImage: 'https://placehold.co/1200x400',
  },
];

const MONETIZATION_SETTINGS = [
  {
    price: 9.99,
    description:
      'Get access to exclusive content, behind-the-scenes, and early previews',
    perks: 'Exclusive content, Behind-the-scenes, Early access, Monthly Q&A',
  },
  {
    price: 19.99,
    description:
      'Premium tier with all benefits plus personalized content and direct messaging',
    perks:
      'All previous perks, Personalized content, Direct messaging, Priority requests',
  },
];

async function getDummyPhotos() {
  const dummyDir = join(process.cwd(), 'scripts/dummy');
  const files = await readdir(dummyDir);
  return files.map((file) => join(dummyDir, file));
}

async function copyDummyImage(
  sourcePath: string,
  userId: string,
  postId: string,
  type: 'feed' | 'collection',
) {
  const baseUploadDir = join(process.cwd(), 'uploads');
  const targetDir = join(baseUploadDir, type);
  const postUploadDir = join(targetDir, postId);

  // Create directories if they don't exist
  await mkdir(postUploadDir, { recursive: true });

  // Copy the dummy image
  const fileName = `image${sourcePath.split('.').pop()}.png`;
  const targetPath = join(postUploadDir, fileName);
  await copyFile(sourcePath, targetPath);

  // Return the relative path
  return `/uploads/${type}/${postId}/${fileName}`;
}

async function seed() {
  try {
    console.log('🌱 Starting seeding...');

    // create uploads directory (feed, collections)
    const baseUploadDir = join(process.cwd(), 'uploads');
    await mkdir(baseUploadDir, { recursive: true });
    await mkdir(join(baseUploadDir, 'feed'), { recursive: true });
    await mkdir(join(baseUploadDir, 'collection'), { recursive: true });

    // Add .gitignore to uploads directory
    await writeFile(join(baseUploadDir, '.gitignore'), '*\n!.gitignore');

    // Get list of dummy photos
    const dummyPhotos = await getDummyPhotos();
    console.log(`📸 Found ${dummyPhotos.length} dummy photos`);

    // Create creators
    const creators = await Promise.all(
      CREATORS.map(async (creator) => {
        const address = `0x${crypto.randomBytes(20).toString('hex')}`;
        return prisma.user.create({
          data: {
            ...creator,
            address,
            accountType: 'CREATOR',
            socials: {
              create: [
                { url: 'https://instagram.com/' + creator.username },
                { url: 'https://twitter.com/' + creator.username },
              ],
            },
            MonetizationSettings: {
              create: MONETIZATION_SETTINGS.map((setting) => ({
                ...setting,
                payoutSchedule: 'MONTHLY',
              })),
            },
          },
        });
      }),
    );

    // Create regular users
    const regularUsers = await Promise.all(
      REGULAR_USERS.map(async (user) => {
        const address = `0x${crypto.randomBytes(20).toString('hex')}`;
        return prisma.user.create({
          data: {
            ...user,
            address,
            accountType: 'USER',
            socials: {
              create: [
                { url: 'https://instagram.com/' + user.username },
                { url: 'https://twitter.com/' + user.username },
              ],
            },
          },
        });
      }),
    );

    // Create collections for creators with random dummy photos
    for (const creator of creators) {
      await Promise.all(
        COLLECTIONS.map(async (collection) => {
          const randomPhoto =
            dummyPhotos[Math.floor(Math.random() * dummyPhotos.length)];
          const collectionId = crypto.randomUUID();
          const coverImage = await copyDummyImage(
            randomPhoto,
            creator.id,
            collectionId,
            'collection',
          );

          return prisma.collection.create({
            data: {
              ...collection,
              userId: creator.id,
              coverImage,
            },
          });
        }),
      );
    }

    // Create feed posts with random dummy photos
    const allUsers = [...creators, ...regularUsers];
    const posts: any[] = [];

    for (const user of allUsers) {
      const userPosts = await Promise.all(
        FEED_POSTS.map(async (post) => {
          const postId = crypto.randomUUID();
          const randomPhoto =
            dummyPhotos[Math.floor(Math.random() * dummyPhotos.length)];
          const imagePath = await copyDummyImage(
            randomPhoto,
            user.id,
            postId,
            'feed',
          );

          return prisma.feedPost.create({
            data: {
              ...post,
              userId: user.id,
              image: imagePath,
            },
          });
        }),
      );
      posts.push(...userPosts);
    }

    // Create random follows between users
    for (const user of allUsers) {
      // Randomly select users to follow (30-70% of other users)
      const followCount = Math.floor(
        allUsers.length * (0.3 + Math.random() * 0.4),
      );
      const usersToFollow = allUsers
        .filter((u) => u.id !== user.id) // Don't follow yourself
        .sort(() => 0.5 - Math.random())
        .slice(0, followCount);

      await Promise.all(
        usersToFollow.map((followedUser) =>
          prisma.follow.create({
            data: {
              followerId: user.id,
              followingId: followedUser.id,
            },
          }),
        ),
      );
    }

    // Create likes and comments with more randomness
    for (const post of posts) {
      // Randomly select users to like the post (40-80% of users)
      const likeCount = Math.floor(
        allUsers.length * (0.4 + Math.random() * 0.4),
      );
      const likers = allUsers
        .sort(() => 0.5 - Math.random())
        .slice(0, likeCount);

      await Promise.all(
        likers.map((user) =>
          prisma.feedPostLike.create({
            data: {
              userId: user.id,
              feedPostId: post.id,
            },
          }),
        ),
      );

      // Randomly select users to comment on the post (20-60% of users)
      const commentCount = Math.floor(
        allUsers.length * (0.2 + Math.random() * 0.4),
      );
      const commenters = allUsers
        .sort(() => 0.5 - Math.random())
        .slice(0, commentCount);

      await Promise.all(
        commenters.map((user) =>
          prisma.feedPostComment.create({
            data: {
              userId: user.id,
              feedPostId: post.id,
              comment: COMMENTS[Math.floor(Math.random() * COMMENTS.length)],
            },
          }),
        ),
      );
    }

    // Create subscriptions with more randomness
    for (const creator of creators) {
      // Randomly select subscribers (20-50% of regular users)
      const subscriberCount = Math.floor(
        regularUsers.length * (0.2 + Math.random() * 0.3),
      );
      const subscribers = regularUsers
        .sort(() => 0.5 - Math.random())
        .slice(0, subscriberCount);

      await Promise.all(
        subscribers.map(async (user) => {
          const subscription = await prisma.subscription.create({
            data: {
              subscriberId: user.id,
              creatorId: creator.id,
              amount: 9.99,
              status: 'ACTIVE',
            },
          });

          // Create transaction record for the subscription
          await prisma.transaction.create({
            data: {
              userId: user.id,
              amount: subscription.amount,
              type: 'SUBSCRIPTION',
            },
          });

          return subscription;
        }),
      );
    }

    // Create some random tips and purchases
    for (const creator of creators) {
      // Randomly select users who might tip or make purchases (10-30% of users)
      const potentialSupporters = allUsers
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(allUsers.length * (0.1 + Math.random() * 0.2)));

      await Promise.all(
        potentialSupporters.map(async (user) => {
          // Randomly decide if this user will tip
          if (Math.random() > 0.7) {
            const tipAmount = Math.floor(Math.random() * 50) + 5; // Random tip between $5 and $55
            await prisma.transaction.create({
              data: {
                userId: user.id,
                amount: tipAmount,
                type: 'TIP',
              },
            });
          }

          // Randomly decide if this user will make a purchase
          if (Math.random() > 0.8) {
            const purchaseAmount = Math.floor(Math.random() * 100) + 10; // Random purchase between $10 and $110
            await prisma.transaction.create({
              data: {
                userId: user.id,
                amount: purchaseAmount,
                type: 'SUBSCRIPTION',
              },
            });
          }
        }),
      );
    }

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
