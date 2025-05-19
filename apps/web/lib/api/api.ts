"use client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface ApiResponse<T> {
   success: boolean;
   data: T;
   error?: string;
}

export async function apiRequest<T>(
   endpoint: string,
   options: RequestInit = {}
): Promise<ApiResponse<T>> {
   const signature = localStorage.getItem("authSignature");
   const address = localStorage.getItem("authAddress");
   const headers = {
      "Content-Type": "application/json",
      "x-eth-signature": signature || "",
      "x-eth-address": address || "",
   };

   const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
   });

   if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
   }

   const data = await response.json();

   if (!data.success) {
      throw new Error(data.error);
   }

   return data;
}
