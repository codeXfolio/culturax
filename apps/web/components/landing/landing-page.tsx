"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import {
   Wallet,
   Sparkles,
   ImageIcon,
   Users,
   ArrowRight,
   Github,
   Twitter,
   Instagram,
   Linkedin,
   CheckCircle2,
   Star,
} from "lucide-react";
import Link from "next/link";
import { FeatureCard } from "@/components/landing/feature-card";
import { HighlightedCreator } from "@/components/landing/highlighted-creator";
import { Testimonial } from "@/components/landing/testimonial";
import Image from "next/image";
import Header from "./header";

export function LandingPage() {
   const { theme } = useTheme();
   return (
      <div className="min-h-screen flex flex-col">
         <Header />

         <main className="flex-1">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-4 md:px-6 lg:px-8 overflow-hidden">
               {/* Background decorative elements */}
               <div className="absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-2xl"></div>
                  <div className="hidden md:block absolute top-1/2 left-16 w-16 h-16 border border-purple-500/30 rounded-full"></div>
                  <div className="hidden md:block absolute bottom-32 right-32 w-24 h-24 border border-blue-500/30 rounded-full"></div>
                  <div className="hidden md:block absolute top-24 right-96 w-8 h-8 bg-purple-500/40 rounded-full"></div>
               </div>

               <div className="container max-w-6xl mx-auto">
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                     {/* Left column - Text content */}
                     <div className="text-left space-y-8">
                        <div className="inline-flex items-center px-3 py-1 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-2">
                           <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                           Web3 Creator Platform
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                           Monetize your{" "}
                           <span className="relative">
                              <span className="relative z-10">creativity</span>
                              <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-purple-500/40 to-blue-500/40 -z-10 transform -rotate-1"></span>
                           </span>{" "}
                           in the Web3 era
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-xl">
                           CreatorX empowers creators with AI tools, NFT
                           monetization, and direct fan connection on Ethereum.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                           <Button
                              size="lg"
                              className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/20"
                           >
                              Get Started <ArrowRight className="h-4 w-4" />
                           </Button>
                           <Button
                              size="lg"
                              variant="outline"
                              className="gap-2 border-purple-500/20 hover:bg-purple-500/5"
                           >
                              <Wallet className="h-4 w-4" /> Connect Wallet
                           </Button>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                           <div className="flex -space-x-2">
                              <div className="w-8 h-8 rounded-full bg-background border-2 border-background flex items-center justify-center overflow-hidden">
                                 <img
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="User"
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                              <div className="w-8 h-8 rounded-full bg-background border-2 border-background flex items-center justify-center overflow-hidden">
                                 <img
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="User"
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                              <div className="w-8 h-8 rounded-full bg-background border-2 border-background flex items-center justify-center overflow-hidden">
                                 <img
                                    src="/placeholder.svg?height=32&width=32"
                                    alt="User"
                                    className="w-full h-full object-cover"
                                 />
                              </div>
                           </div>
                           <span>
                              Join <strong>10,000+</strong> creators already on
                              the platform
                           </span>
                        </div>
                     </div>

                     {/* Right column - Hero image */}
                     <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl opacity-30 blur-lg"></div>
                        <div className="relative bg-gradient-to-br from-background to-background/80 p-1 rounded-2xl border border-border/40 shadow-xl overflow-hidden backdrop-blur">
                           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 z-0"></div>
                           <div className="relative z-10">
                              <Image
                                 src="/hero-2.png"
                                 alt="Hero Image"
                                 width={600}
                                 height={600}
                                 className="w-full h-full object-cover dark:hidden"
                              />
                              <Image
                                 src="/hero.png"
                                 alt="Hero Image"
                                 width={600}
                                 height={600}
                                 className="w-full h-full object-cover hidden dark:block"
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Brands/Partners section */}
                  {/* <div className="mt-20 pt-10 border-t border-border/20">
                     <p className="text-center text-sm text-muted-foreground mb-6">
                        Trusted by leading Web3 brands
                     </p>
                     <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                        <div className="opacity-70 hover:opacity-100 transition-opacity">
                           <img
                              src="/placeholder.svg?height=30&width=120"
                              alt="Partner logo"
                              className="h-6 w-auto"
                           />
                        </div>
                        <div className="opacity-70 hover:opacity-100 transition-opacity">
                           <img
                              src="/placeholder.svg?height=30&width=120"
                              alt="Partner logo"
                              className="h-6 w-auto"
                           />
                        </div>
                        <div className="opacity-70 hover:opacity-100 transition-opacity">
                           <img
                              src="/placeholder.svg?height=30&width=120"
                              alt="Partner logo"
                              className="h-6 w-auto"
                           />
                        </div>
                        <div className="opacity-70 hover:opacity-100 transition-opacity">
                           <img
                              src="/placeholder.svg?height=30&width=120"
                              alt="Partner logo"
                              className="h-6 w-auto"
                           />
                        </div>
                     </div>
                  </div> */}
               </div>
            </section>

            {/* Features Section */}
            <section
               id="features"
               className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
            >
               {/* Background decorative elements */}
               <div className="absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="hidden md:block absolute bottom-32 left-32 w-24 h-24 border border-purple-500/20 rounded-full"></div>
                  <div className="hidden md:block absolute top-24 left-1/3 w-8 h-8 bg-blue-500/30 rounded-full"></div>
               </div>

               <div className="container max-w-6xl mx-auto">
                  <div className="text-center mb-16 relative">
                     <div className="inline-flex items-center px-3 py-1 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-4">
                        <Sparkles className="h-3.5 w-3.5 mr-2 text-purple-500" />
                        Powerful Features
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Everything Creators Need
                     </h2>
                     <p className="text-muted-foreground max-w-2xl mx-auto">
                        A complete toolkit to create, monetize, and grow your
                        digital presence in the Web3 ecosystem.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                     {/* Simplified hover effects for feature cards */}
                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <FeatureCard
                           icon={
                              <Sparkles className="h-6 w-6 text-purple-500" />
                           }
                           title="AI Creation Tools"
                           description="Generate content, captions, and ideas with our advanced AI tools."
                        />
                     </div>

                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <FeatureCard
                           icon={<Users className="h-6 w-6 text-blue-500" />}
                           title="Subscription Model"
                           description="Offer premium content to your subscribers with recurring revenue."
                        />
                     </div>

                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <FeatureCard
                           icon={
                              <ImageIcon className="h-6 w-6 text-purple-500" />
                           }
                           title="Creator NFTs"
                           description="Mint and sell exclusive NFTs directly to your biggest fans."
                        />
                     </div>

                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <FeatureCard
                           icon={<Wallet className="h-6 w-6 text-blue-500" />}
                           title="Web3 Login"
                           description="Secure and simple authentication with your Ethereum wallet."
                        />
                     </div>
                  </div>
               </div>
            </section>

            {/* Highlighted Creators Section */}
            <section
               id="creators"
               className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
            >
               {/* Background decorative elements */}
               <div className="absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="hidden md:block absolute top-32 right-32 w-24 h-24 border border-blue-500/20 rounded-full"></div>
                  <div className="hidden md:block absolute bottom-24 right-1/3 w-8 h-8 bg-purple-500/30 rounded-full"></div>
               </div>

               <div className="container max-w-6xl mx-auto">
                  <div className="text-center mb-16 relative">
                     <div className="inline-flex items-center px-3 py-1 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-4">
                        <Star className="h-3.5 w-3.5 mr-2 text-blue-500" />
                        Featured Creators
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Meet Our Top Creators
                     </h2>
                     <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover talented creators who are making waves in the
                        CreatorX ecosystem.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* Simplified hover effects for creator cards */}
                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <HighlightedCreator
                           name="Alex Rivera"
                           username="alexrivera"
                           category="Digital Art"
                           followers="24.5K"
                           bio="Digital artist specializing in futuristic landscapes and NFT collections."
                           avatarUrl="/placeholder.svg?height=100&width=100"
                           coverUrl="/placeholder.svg?height=200&width=400"
                           verified={true}
                        />
                     </div>

                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <HighlightedCreator
                           name="Sarah Johnson"
                           username="sarahjcreates"
                           category="Photography"
                           followers="18.2K"
                           bio="Capturing moments and emotions through the lens. NFT photographer and visual storyteller."
                           avatarUrl="/placeholder.svg?height=100&width=100"
                           coverUrl="/placeholder.svg?height=200&width=400"
                           verified={true}
                        />
                     </div>

                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <HighlightedCreator
                           name="Michael Chen"
                           username="michaelchenmusic"
                           category="Music"
                           followers="32.1K"
                           bio="Electronic music producer and sound designer. Creating audio NFTs and immersive experiences."
                           avatarUrl="/placeholder.svg?height=100&width=100"
                           coverUrl="/placeholder.svg?height=200&width=400"
                           verified={false}
                        />
                     </div>
                  </div>

                  <div className="text-center mt-12">
                     <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="border-purple-500/20 hover:bg-purple-500/5 shadow-sm"
                     >
                        <Link href="/explore">
                           Explore All Creators{" "}
                           <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                     </Button>
                  </div>
               </div>
            </section>

            {/* Testimonials Section */}
            <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
               {/* Background decorative elements */}
               <div className="absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                  <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                  <div className="hidden md:block absolute bottom-32 right-32 w-24 h-24 border border-purple-500/20 rounded-full"></div>
                  <div className="hidden md:block absolute top-24 right-1/3 w-8 h-8 bg-blue-500/30 rounded-full"></div>
               </div>

               <div className="container max-w-6xl mx-auto">
                  <div className="text-center mb-16 relative">
                     <div className="inline-flex items-center px-3 py-1 rounded-full border border-border/60 bg-background/60 backdrop-blur-sm text-sm font-medium text-muted-foreground mb-4">
                        <Star className="h-3.5 w-3.5 mr-2 text-purple-500" />
                        Success Stories
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        What Creators Are Saying
                     </h2>
                     <p className="text-muted-foreground max-w-2xl mx-auto">
                        Hear from creators who have transformed their digital
                        presence with CreatorX.
                     </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     {/* Simplified hover effects for testimonial cards */}
                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <Testimonial
                           quote="CreatorX has completely transformed how I monetize my art. The NFT tools are intuitive, and I've seen a 300% increase in my monthly revenue."
                           author="Emma Rodriguez"
                           role="Digital Artist"
                           avatarUrl="/placeholder.svg?height=50&width=50"
                        />
                     </div>

                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <Testimonial
                           quote="The AI tools have saved me countless hours creating content. My audience has grown by 10K followers since I joined the platform."
                           author="Jason Kim"
                           role="Content Creator"
                           avatarUrl="/placeholder.svg?height=50&width=50"
                        />
                     </div>

                     <div className="transition-all duration-200 hover:translate-y-[-4px]">
                        <Testimonial
                           quote="The subscription model is seamless. My fans love the exclusive content, and I love the direct connection without middlemen taking a cut."
                           author="Sophia Chen"
                           role="Musician"
                           avatarUrl="/placeholder.svg?height=50&width=50"
                        />
                     </div>
                  </div>
               </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-24 px-4 md:px-6 lg:px-8 overflow-hidden">
               {/* Background decorative elements */}
               <div className="absolute inset-0 -z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10"></div>
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="hidden md:block absolute top-1/2 left-16 w-16 h-16 border border-purple-500/30 rounded-full"></div>
                  <div className="hidden md:block absolute bottom-32 right-32 w-24 h-24 border border-blue-500/30 rounded-full"></div>
               </div>

               <div className="container max-w-4xl mx-auto text-center relative">
                  <div className="relative bg-background/60 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-border/40 shadow-lg">
                     <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Ready to Start Creating?
                     </h2>
                     <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                        Join thousands of creators already using CreatorX to
                        build their Web3 presence and monetize their creativity.
                     </p>

                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                           size="lg"
                           className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0 shadow-lg shadow-purple-500/20"
                           asChild
                        >
                           <Link href="/register">
                              Get Started Now <ArrowRight className="h-4 w-4" />
                           </Link>
                        </Button>
                        <Button
                           size="lg"
                           variant="outline"
                           className="gap-2 border-purple-500/20 hover:bg-purple-500/5"
                           asChild
                        >
                           <Link href="#features">Learn More</Link>
                        </Button>
                     </div>

                     <div className="mt-8 pt-8 border-t border-border/20 flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                           <CheckCircle2 className="h-4 w-4 text-green-500" />
                           <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <CheckCircle2 className="h-4 w-4 text-green-500" />
                           <span>Free tier available</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <CheckCircle2 className="h-4 w-4 text-green-500" />
                           <span>Cancel anytime</span>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </main>

         <footer className="relative border-t border-border/40 py-12 px-4 md:px-6 lg:px-8 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
               <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
               <div className="absolute top-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container max-w-6xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                  <div>
                     <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                           <span className="font-bold text-white">CX</span>
                        </div>
                        <span className="font-bold text-xl">CreatorX</span>
                     </div>
                     <p className="text-sm text-muted-foreground mb-4">
                        Empowering creators in the Web3 ecosystem with
                        innovative tools for monetization and growth.
                     </p>
                     <div className="flex items-center gap-3">
                        <Link
                           href="#"
                           className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                           <Twitter className="h-5 w-5" />
                           <span className="sr-only">Twitter</span>
                        </Link>
                        <Link
                           href="#"
                           className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                           <Instagram className="h-5 w-5" />
                           <span className="sr-only">Instagram</span>
                        </Link>
                        <Link
                           href="#"
                           className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                           <Github className="h-5 w-5" />
                           <span className="sr-only">GitHub</span>
                        </Link>
                        <Link
                           href="#"
                           className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                           <Linkedin className="h-5 w-5" />
                           <span className="sr-only">LinkedIn</span>
                        </Link>
                     </div>
                  </div>

                  <div>
                     <h3 className="font-medium mb-4">Platform</h3>
                     <ul className="space-y-2">
                        <li>
                           <Link
                              href="#features"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Features
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Pricing
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Roadmap
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              NFT Marketplace
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              AI Tools
                           </Link>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="font-medium mb-4">Resources</h3>
                     <ul className="space-y-2">
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Documentation
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Tutorials
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Blog
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Creator Guides
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              API Reference
                           </Link>
                        </li>
                     </ul>
                  </div>

                  <div>
                     <h3 className="font-medium mb-4">Company</h3>
                     <ul className="space-y-2">
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              About Us
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Careers
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="/terms"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Terms of Service
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="/privacy"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Privacy Policy
                           </Link>
                        </li>
                        <li>
                           <Link
                              href="#"
                              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                           >
                              Contact Us
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>

               <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-border/40">
                  <p className="text-sm text-muted-foreground mb-4 md:mb-0">
                     © {new Date().getFullYear()} CreatorX. All rights reserved.
                  </p>
                  <div className="flex items-center gap-4">
                     <Link
                        href="/terms"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                     >
                        Terms
                     </Link>
                     <Link
                        href="/privacy"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                     >
                        Privacy
                     </Link>
                     <Link
                        href="/privacy#cookies"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                     >
                        Cookies
                     </Link>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
