import { apiRequest } from "@/lib/api/api";

export interface Creator {
   id: string;
   name: string;
   username: string;
   avatar: string;
   bio: string;
   totalFollowers: number;
   featured: boolean;
   address: string;
   isFollowed: boolean;
   coverImage: string;
}

export interface Subscription {
   id: string;
   amount: number;
   subscriberId: string;
   creatorId: string;
   startDate: string;
   status: "ACTIVE" | "CANCELLED" | "EXPIRED";
}

export interface MonetizationSettings {
   price: number;
   period: "month" | "week" | "biweekly";
   description: string;
   features: string[];
}

export interface FeedItem {
   id: string;
   caption: string;
   image: string;
   createdAt: string;
   isPremium: boolean;
   userId: string;
   FeedPostLike: any[];
   FeedPostComment: any[];
   user: {
      id: string;
      name: string;
      username: string;
      avatar: string;
   };
}

export interface ContentPreview {
   id: string;
   title: string;
   type: string;
   thumbnail: string;
   locked: boolean;
}

interface FeedResponse {
   success: boolean;
   data: FeedItem[];
   pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
   };
}

export const getCreatorProfile = async (username: string) => {
   const response = await apiRequest<Creator>(`/api/user/${username}`);
   return response.data;
};

export const followUser = async (
   userAddress: string,
   targetAddress: string
) => {
   const response = await apiRequest<{ id: string }>(`/api/user/follow`, {
      method: "POST",
      body: JSON.stringify({ userAddress, targetAddress }),
   });
   return response.data;
};

export const unfollowUser = async (
   userAddress: string,
   targetAddress: string
) => {
   const response = await apiRequest<{ id: string }>(`/api/user/unfollow`, {
      method: "POST",
      body: JSON.stringify({ userAddress, targetAddress }),
   });
   return response.data;
};

export const getCreatorMonetizationSettings = async (userId: string) => {
   const response = await apiRequest<MonetizationSettings>(
      `/api/subscription/monetization/settings/${userId}`
   );
   return response.data;
};

export const createSubscription = async (
   subscriberId: string,
   creatorId: string
) => {
   const response = await apiRequest<Subscription>("/api/subscription/create", {
      method: "POST",
      body: JSON.stringify({ subscriberId, creatorId }),
   });
   return response.data;
};

export async function getCreatorFeed(
   username: string,
   page: number = 1
): Promise<any> {
   const response = await apiRequest<{
      data: FeedItem[];
      pagination: {
         total: number;
         page: number;
         limit: number;
         totalPages: number;
      };
   }>(`/api/feed?username=${username}&page=${page}`);

   return response;
}

export const getCreatorCollections = async (userId: string) => {
   const response = await apiRequest<ContentPreview[]>(
      `/api/collection/user/${userId}`
   );
   return response.data;
};

export const likePost = async (userId: string, feedPostId: string) => {
   const response = await apiRequest<{ id: string }>("/api/feed/like", {
      method: "POST",
      body: JSON.stringify({ userId, feedPostId }),
   });
   return response.data;
};

export const unlikePost = async (userId: string, feedPostId: string) => {
   const response = await apiRequest<{ id: string }>("/api/feed/unlike", {
      method: "POST",
      body: JSON.stringify({ userId, feedPostId }),
   });
   return response.data;
};

export const addComment = async (
   userId: string,
   feedPostId: string,
   comment: string
) => {
   const response = await apiRequest<{ id: string }>("/api/feed/comment", {
      method: "POST",
      body: JSON.stringify({ userId, feedPostId, comment }),
   });
   return response.data;
};

export const deleteComment = async (commentId: string) => {
   const response = await apiRequest<{ id: string }>(
      `/api/feed/comment/${commentId}`,
      {
         method: "DELETE",
      }
   );
   return response.data;
};
