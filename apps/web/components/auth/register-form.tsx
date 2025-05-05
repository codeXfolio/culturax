"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Wallet, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SmartWallet } from "../SmartWallet";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";

export function RegisterForm() {
   const { user } = usePrivy();
   const router = useRouter();
   const [isLoading, setIsLoading] = useState(false);
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      username: "",
      accountType: "creator",
      bio: "",
      termsAccepted: false,
   });

   useEffect(() => {
      if (user) {
         const twitterName = user.twitter?.name;
         const twitterUsername = user.twitter?.username;
         if (twitterName && twitterUsername) {
            setFormData((prev) => ({
               ...prev,
               name: twitterName,
               username: twitterUsername,
            }));
         }

         const farcasterName = user.farcaster?.displayName;
         const farcasterUsername = user.farcaster?.username;
         if (farcasterName && farcasterUsername) {
            setFormData((prev) => ({
               ...prev,
               name: farcasterName,
               username: farcasterUsername,
            }));
         }

         const googleName = user.google?.name;
         const googleEmail = user.google?.email;
         if (googleName && googleEmail) {
            setFormData((prev) => ({
               ...prev,
               name: googleName,
               email: googleEmail,
            }));
         }
      }
   }, [user]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, checked } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: name === "termsAccepted" ? checked : value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      setIsLoading(true);

      try {
         const authSignature = localStorage.getItem("authSignature");
         const authAddress = localStorage.getItem("authAddress");

         if (!authSignature || !authAddress) {
            toast.error("Please connect your wallet first");
            return;
         }

         const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/user/register`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "x-eth-signature": authSignature,
                  "x-eth-address": authAddress,
               },
               body: JSON.stringify({
                  name: formData.name,
                  email: formData.email,
                  username: formData.username,
                  accountType: formData.accountType.toUpperCase(),
                  address: authAddress,
                  bio: formData.bio,
                  avatar:
                     user?.twitter?.profilePictureUrl ||
                     user?.farcaster?.pfp ||
                     "https://placehold.co/400x400",
               }),
            }
         );

         const data: {
            success: boolean;
            error?: string;
            data: { id: string };
         } = await response.json();

         if (data.success) {
            toast.success("Registration successful!");
            localStorage.setItem("userId", data.data.id);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push("/feed");
         } else {
            toast.error(data.error || "Registration failed");
         }
      } catch (error) {
         console.error("Registration error:", error);
         toast.error("An error occurred during registration");
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-muted/30">
         <Link href="/" className="flex items-center gap-2 mb-8 pt-4">
            <Image src="/logo.png" alt="CulturaX" width={32} height={32} />
            <span className="font-bold text-xl">CulturaX</span>
         </Link>

         <Card className="w-full max-w-md border-0 shadow-xl mb-5">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg opacity-20 blur-sm w-full"></div>
            <CardHeader className="relative">
               <CardTitle className="text-2xl text-center">
                  Create Your CulturaX Account
               </CardTitle>
               <CardDescription className="text-center">
                  Join the Web3 creator ecosystem
               </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
               <CardContent className="relative space-y-6">
                  <div className="space-y-2">
                     <h3 className="text-sm font-medium">
                        Step 1: Connect Wallet
                     </h3>
                     <SmartWallet />
                  </div>

                  <div className="space-y-4">
                     <h3 className="text-sm font-medium">
                        Step 2: Complete Profile
                     </h3>

                     <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                           id="name"
                           name="name"
                           placeholder="Enter your full name"
                           value={formData.name}
                           onChange={handleInputChange}
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                           id="email"
                           name="email"
                           type="email"
                           placeholder="Enter your email"
                           value={formData.email}
                           onChange={handleInputChange}
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                           id="username"
                           name="username"
                           placeholder="Choose a unique username"
                           value={formData.username}
                           onChange={handleInputChange}
                           required
                        />
                     </div>

                     <div className="space-y-2">
                        <Label>I am a</Label>
                        <RadioGroup
                           defaultValue="creator"
                           className="flex gap-4"
                           onValueChange={(value) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 accountType: value,
                              }))
                           }
                        >
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                 value="creator"
                                 id="wallet-creator"
                              />
                              <Label htmlFor="wallet-creator">Creator</Label>
                           </div>
                           <div className="flex items-center space-x-2">
                              <RadioGroupItem value="user" id="wallet-fan" />
                              <Label htmlFor="wallet-fan">Fan</Label>
                           </div>
                        </RadioGroup>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="bio">Bio (Optional)</Label>
                        <Input
                           id="bio"
                           name="bio"
                           placeholder="Tell us about yourself"
                           value={formData.bio}
                           onChange={handleInputChange}
                        />
                     </div>

                     <div className="flex items-center space-x-2">
                        <Checkbox
                           id="terms"
                           name="termsAccepted"
                           checked={formData.termsAccepted}
                           onCheckedChange={(checked) =>
                              setFormData((prev) => ({
                                 ...prev,
                                 termsAccepted: checked as boolean,
                              }))
                           }
                        />
                        <Label htmlFor="terms" className="text-sm">
                           I agree to the{" "}
                           <Link
                              href="/terms"
                              className="text-primary hover:underline"
                           >
                              Terms of Service
                           </Link>{" "}
                           and{" "}
                           <Link
                              href="/privacy"
                              className="text-primary hover:underline"
                           >
                              Privacy Policy
                           </Link>
                        </Label>
                     </div>
                  </div>
               </CardContent>
               <CardFooter className="relative flex flex-col gap-4">
                  <Button
                     className="w-full"
                     disabled={isLoading || !formData.termsAccepted}
                     onClick={handleSubmit}
                  >
                     {isLoading ? "Registering..." : "Sign & Register"}
                  </Button>
               </CardFooter>
            </form>
         </Card>
      </div>
   );
}
