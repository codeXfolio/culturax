import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Terms of Service | CreatorX",
  description: "Terms of Service for CreatorX platform",
}

export default function TermsPage() {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: April 11, 2025</p>
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to CreatorX. These Terms of Service govern your use of our website and platform located at
              creatorx.com (the "Service") operated by CreatorX Inc. ("us", "we", or "our").
            </p>
            <p>
              By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of
              the terms, then you may not access the Service.
            </p>

            <h2>2. Accounts</h2>
            <p>
              When you create an account with us, you must provide information that is accurate, complete, and current
              at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate
              termination of your account on our Service.
            </p>
            <p>
              You are responsible for safeguarding the password that you use to access the Service and for any
              activities or actions under your password, whether your password is with our Service or a third-party
              service.
            </p>

            <h2>3. Content</h2>
            <p>
              Our Service allows you to post, link, store, share and otherwise make available certain information, text,
              graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or
              through the Service, including its legality, reliability, and appropriateness.
            </p>
            <p>
              By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours
              (you own it) or you have the right to use it and grant us the rights and license as provided in these
              Terms, and (ii) the posting of your Content on or through the Service does not violate the privacy rights,
              publicity rights, copyrights, contract rights or any other rights of any person.
            </p>

            <h2>4. NFTs and Digital Assets</h2>
            <p>
              CreatorX provides a platform for creators to mint, sell, and trade NFTs (Non-Fungible Tokens) and other
              digital assets. By using our platform for these purposes, you acknowledge and agree to the following:
            </p>
            <ul>
              <li>You have the legal right to create and sell any content you tokenize as an NFT</li>
              <li>You understand the inherent risks associated with blockchain technology and cryptocurrencies</li>
              <li>CreatorX is not responsible for fluctuations in the value of digital assets</li>
              <li>Transactions on the blockchain are irreversible</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              The Service and its original content (excluding Content provided by users), features and functionality are
              and will remain the exclusive property of CreatorX Inc. and its licensors. The Service is protected by
              copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and
              trade dress may not be used in connection with any product or service without the prior written consent of
              CreatorX Inc.
            </p>

            <h2>6. Termination</h2>
            <p>
              We may terminate or suspend your account immediately, without prior notice or liability, for any reason
              whatsoever, including without limitation if you breach the Terms.
            </p>
            <p>
              Upon termination, your right to use the Service will immediately cease. If you wish to terminate your
              account, you may simply discontinue using the Service.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              In no event shall CreatorX Inc., nor its directors, employees, partners, agents, suppliers, or affiliates,
              be liable for any indirect, incidental, special, consequential or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your
              access to or use of or inability to access or use the Service; (ii) any conduct or content of any third
              party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or
              alteration of your transmissions or content, whether based on warranty, contract, tort (including
              negligence) or any other legal theory, whether or not we have been informed of the possibility of such
              damage.
            </p>

            <h2>8. Changes</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material we will try to provide at least 30 days notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at support@creatorx.com.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
