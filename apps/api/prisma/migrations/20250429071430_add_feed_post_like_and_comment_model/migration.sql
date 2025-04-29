-- CreateTable
CREATE TABLE "FeedPost" (
    "id" TEXT NOT NULL,
    "image" TEXT,
    "caption" TEXT,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FeedPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedPostComment" (
    "id" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "feedPostId" TEXT NOT NULL,

    CONSTRAINT "FeedPostComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedPostLike" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "feedPostId" TEXT NOT NULL,

    CONSTRAINT "FeedPostLike_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FeedPost" ADD CONSTRAINT "FeedPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPostComment" ADD CONSTRAINT "FeedPostComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPostComment" ADD CONSTRAINT "FeedPostComment_feedPostId_fkey" FOREIGN KEY ("feedPostId") REFERENCES "FeedPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPostLike" ADD CONSTRAINT "FeedPostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FeedPostLike" ADD CONSTRAINT "FeedPostLike_feedPostId_fkey" FOREIGN KEY ("feedPostId") REFERENCES "FeedPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
