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

export const getCreatorProfile = async (username: string) => {
   return await apiRequest<Creator>(`/api/user/${username}`);
};

export const followUser = async (
   userAddress: string,
   targetAddress: string
) => {
   return apiRequest<{ id: string }>(`/api/user/follow`, {
      method: "POST",
      body: JSON.stringify({ userAddress, targetAddress }),
   });
};

export const unfollowUser = async (
   userAddress: string,
   targetAddress: string
) => {
   return apiRequest<{ id: string }>(`/api/user/unfollow`, {
      method: "POST",
      body: JSON.stringify({ userAddress, targetAddress }),
   });
};

export const getCreatorMonetizationSettings = async (userId: string) => {
   return apiRequest<MonetizationSettings>(
      `/api/subscription/monetization/settings/${userId}`
   );
};

export const createSubscription = async (
   subscriberId: string,
   creatorId: string
) => {
   return apiRequest<Subscription>("/api/subscription/create", {
      method: "POST",
      body: JSON.stringify({ subscriberId, creatorId }),
   });
};

export const getCreatorFeed = async (userId: string) => {
   return apiRequest<FeedItem[]>(`/api/feed/user/${userId}`);
};

export const getCreatorCollections = async (userId: string) => {
   return apiRequest<ContentPreview[]>(`/api/collection/user/${userId}`);
};

export const likePost = async (userId: string, feedPostId: string) => {
   return apiRequest<{ id: string }>("/api/feed/like", {
      method: "POST",
      body: JSON.stringify({ userId, feedPostId }),
   });
};

export const unlikePost = async (userId: string, feedPostId: string) => {
   return apiRequest<{ id: string }>("/api/feed/unlike", {
      method: "POST",
      body: JSON.stringify({ userId, feedPostId }),
   });
};

export const addComment = async (
   userId: string,
   feedPostId: string,
   comment: string
) => {
   return apiRequest<{ id: string }>("/api/feed/comment", {
      method: "POST",
      body: JSON.stringify({ userId, feedPostId, comment }),
   });
};

export const deleteComment = async (commentId: string) => {
   return apiRequest<{ id: string }>(`/api/feed/comment/${commentId}`, {
      method: "DELETE",
   });
};
