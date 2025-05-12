import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export const fetchProfile = async () => {
   const userId = localStorage.getItem("userId");
   const authSignature = localStorage.getItem("authSignature");
   const authAddress = localStorage.getItem("authAddress");

   const headers: HeadersInit = {
      "Content-Type": "application/json",
   };

   if (authSignature && authAddress) {
      headers["x-eth-signature"] = authSignature;
      headers["x-eth-address"] = authAddress;
   }

   const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}/profile`,
      { headers }
   );
   const data: {
      success: boolean;
      data: { avatar: string; accountType: string; username: string };
   } = await response.json();

   if (data.success) {
      return data.data;
   }

   return null;
};
