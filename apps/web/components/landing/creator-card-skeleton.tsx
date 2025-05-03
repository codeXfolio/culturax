import React from "react";

export function CreatorCardSkeleton() {
   return (
      <div className="rounded-2xl border border-border/40 bg-background shadow-xl overflow-hidden animate-pulse">
         {/* Cover Image Skeleton */}
         <div className="w-full h-32 bg-muted" />
         <div className="flex flex-col items-center p-6 -mt-12">
            {/* Avatar Skeleton */}
            <div className="w-24 h-24 rounded-full border-4 border-background bg-muted mb-4" />
            {/* Name Skeleton */}
            <div className="h-4 w-32 bg-muted rounded mb-2" />
            {/* Username Skeleton */}
            <div className="h-3 w-20 bg-muted rounded mb-4" />
            {/* Followers Skeleton */}
            <div className="h-3 w-16 bg-muted rounded mb-4" />
            {/* Bio Skeleton */}
            <div className="h-3 w-40 bg-muted rounded mb-1" />
            <div className="h-3 w-28 bg-muted rounded" />
         </div>
      </div>
   );
}
