import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
   title: "Privacy Policy | CreatorX",
   description: "Privacy Policy for CreatorX platform",
};

export default function PrivacyPage() {
   return (
      <div className="min-h-screen bg-background">
         <div className="container max-w-4xl py-12 px-4 md:py-24">
            <div className="mb-8">
               <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <Link href="/">
                     <ArrowLeft className="h-4 w-4" />
                     Back to Home
                  </Link>
               </Button>
            </div>

            <div className="space-y-8">
               <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4">
                     Privacy Policy
                  </h1>
                  <p className="text-muted-foreground">
                     Last updated: April 11, 2025
                  </p>
               </div>

               <div className="prose prose-gray dark:prose-invert max-w-none">
                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     1. Introduction
                  </h2>
                  <p className="mb-4">
                     CreatorX Inc. ("we", "our", or "us") is committed to
                     protecting your privacy. This Privacy Policy explains how
                     we collect, use, disclose, and safeguard your information
                     when you use our platform located at creatorx.com (the
                     "Service").
                  </p>
                  <p className="mb-4">
                     Please read this Privacy Policy carefully. By accessing or
                     using the Service, you acknowledge that you have read,
                     understood, and agree to be bound by all the terms of this
                     Privacy Policy.
                  </p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     2. Information We Collect
                  </h2>
                  <p className="mb-4">
                     We collect information that you provide directly to us when
                     you:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                     <li>Create an account and profile</li>
                     <li>Connect a wallet or other Web3 credentials</li>
                     <li>Upload content or create NFTs</li>
                     <li>Communicate with other users</li>
                     <li>Contact our support team</li>
                     <li>Subscribe to our newsletters</li>
                     <li>Participate in surveys, contests, or promotions</li>
                  </ul>

                  <p className="mb-4">This information may include:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                     <li>Name, email address, and other contact information</li>
                     <li>
                        Blockchain wallet addresses and transaction history on
                        our platform
                     </li>
                     <li>
                        Profile information and content you choose to upload
                     </li>
                     <li>Communications with other users and our team</li>
                     <li>
                        Payment information (processed securely through our
                        payment processors)
                     </li>
                  </ul>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     3. Automatically Collected Information
                  </h2>
                  <p className="mb-4">
                     When you access or use our Service, we automatically
                     collect certain information, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                     <li>
                        Log information (IP address, browser type, pages
                        visited, time spent)
                     </li>
                     <li>
                        Device information (hardware model, operating system,
                        unique device identifiers)
                     </li>
                     <li>Location information (with your consent)</li>
                     <li>Cookies and similar technologies</li>
                     <li>
                        Public blockchain data related to your transactions
                     </li>
                  </ul>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     4. How We Use Your Information
                  </h2>
                  <p className="mb-4">We use the information we collect to:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                     <li>Provide, maintain, and improve our Service</li>
                     <li>Process transactions and send related information</li>
                     <li>Verify your identity and prevent fraud</li>
                     <li>
                        Personalize your experience and provide content
                        recommendations
                     </li>
                     <li>
                        Communicate with you about products, services, and
                        events
                     </li>
                     <li>Monitor and analyze trends, usage, and activities</li>
                     <li>Comply with legal obligations</li>
                  </ul>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     5. Sharing of Information
                  </h2>
                  <p className="mb-4">We may share your information with:</p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                     <li>
                        Other users (as part of your public profile and content)
                     </li>
                     <li>
                        Service providers who perform services on our behalf
                     </li>
                     <li>Business partners with your consent</li>
                     <li>
                        In response to legal process or when required by law
                     </li>
                     <li>In connection with a merger, sale, or acquisition</li>
                  </ul>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     6. Blockchain Data
                  </h2>
                  <p className="mb-4">
                     Please be aware that blockchain technology is inherently
                     public and transparent. When you engage in transactions on
                     our platform that interact with a blockchain:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                     <li>
                        Your wallet address and transaction details will be
                        publicly visible on the blockchain
                     </li>
                     <li>
                        NFTs and other digital assets you create or purchase
                        will be linked to your wallet address
                     </li>
                     <li>
                        This information cannot be deleted or modified due to
                        the immutable nature of blockchain technology
                     </li>
                  </ul>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     7. Your Choices
                  </h2>
                  <p className="mb-4">
                     You have several choices regarding the information you
                     provide to us:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                     <li>
                        Update or correct your account information in your
                        profile settings
                     </li>
                     <li>Opt out of marketing communications</li>
                     <li>Set your browser to reject cookies</li>
                     <li>
                        Request deletion of your account (subject to certain
                        limitations)
                     </li>
                  </ul>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     8. Security
                  </h2>
                  <p className="mb-4">
                     We take reasonable measures to help protect your personal
                     information from loss, theft, misuse, unauthorized access,
                     disclosure, alteration, and destruction. However, no
                     internet or electronic transmission is ever fully secure or
                     error-free.
                  </p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     9. International Transfers
                  </h2>
                  <p className="mb-4">
                     Your information may be transferred to, and maintained on,
                     computers located outside of your state, province, country,
                     or other governmental jurisdiction where the data
                     protection laws may differ from those in your jurisdiction.
                  </p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     10. Children's Privacy
                  </h2>
                  <p className="mb-4">
                     Our Service is not directed to children under 13 (or other
                     age as required by local law), and we do not knowingly
                     collect personal information from children. If we learn we
                     have collected personal information from a child, we will
                     delete that information.
                  </p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     11. Changes to This Privacy Policy
                  </h2>
                  <p className="mb-4">
                     We may update our Privacy Policy from time to time. We will
                     notify you of any changes by posting the new Privacy Policy
                     on this page and updating the "Last Updated" date.
                  </p>

                  <h2 className="text-2xl font-semibold mt-8 mb-4">
                     12. Contact Us
                  </h2>
                  <p className="mb-4">
                     If you have any questions about this Privacy Policy, please
                     contact us at privacy@creatorx.com.
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}
