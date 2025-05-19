"use client";
import React, { useEffect, useState } from "react";
import { CreatorCardSkeleton } from "./creator-card-skeleton";
import { HighlightedCreator } from "./highlighted-creator";

interface Creator {
   id: string;
   name: string;
   username: string;
   avatar: string;
   coverImage: string;
   totalFollowers: number;
   featured: boolean;
   bio: string;
}

function TopCreator() {
   const [isLoading, setIsLoading] = useState(true);
   const [creators, setCreators] = useState<Creator[]>([]);

   useEffect(() => {
      const fetchCreators = async () => {
         const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/api/creator/top"
         );
         const data = await response.json();
         const result: Creator[] = data.data;
         setCreators(result);
         setIsLoading(false);
      };
      fetchCreators();
   }, []);

   return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {/* Simplified hover effects for creator cards */}
         {isLoading ? (
            <>
               <div className="transition-all duration-200 hover:translate-y-[-4px]">
                  <CreatorCardSkeleton />
               </div>

               <div className="transition-all duration-200 hover:translate-y-[-4px]">
                  <CreatorCardSkeleton />
               </div>

               <div className="transition-all duration-200 hover:translate-y-[-4px]">
                  <CreatorCardSkeleton />
               </div>
            </>
         ) : (
            creators.length > 0 &&
            creators.map((creator) => (
               <div
                  className="transition-all duration-200 hover:translate-y-[-4px]"
                  key={creator.id}
               >
                  <HighlightedCreator
                     name={creator.name}
                     username={creator.username}
                     followers={creator.totalFollowers.toString()}
                     avatarUrl={creator.avatar}
                     coverUrl={creator.coverImage}
                     verified={creator.featured}
                     category={""}
                     bio={creator.bio}
                  />
               </div>
            ))
         )}
      </div>
   );
}

export default TopCreator;
