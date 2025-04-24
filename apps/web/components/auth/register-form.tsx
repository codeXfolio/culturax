"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { Wallet, Mail } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
          <span className="font-bold text-white">CX</span>
        </div>
        <span className="font-bold text-xl">CreatorX</span>
      </Link>

      <Card className="w-full max-w-md border-0 shadow-lg">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg opacity-20 blur-sm"></div>
        <CardHeader className="relative">
          <CardTitle className="text-2xl text-center">Create Your CreatorX Account</CardTitle>
          <CardDescription className="text-center">Join the Web3 creator ecosystem</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-6">
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </TabsTrigger>
              <TabsTrigger value="wallet" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                <span>Wallet</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-username">Username</Label>
                <Input id="email-username" placeholder="Choose a unique username" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-address">Email</Label>
                <Input id="email-address" type="email" placeholder="Enter your email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-password">Password</Label>
                <Input id="email-password" type="password" placeholder="Create a password" />
              </div>

              <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup defaultValue="creator" className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="creator" id="email-creator" />
                    <Label htmlFor="email-creator">Creator</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fan" id="email-fan" />
                    <Label htmlFor="email-fan">Fan</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="email-terms" />
                <Label htmlFor="email-terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button className="w-full">Create Account</Button>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Step 1: Connect Wallet</h3>
                <Button className="w-full gap-2" size="lg">
                  <Wallet className="h-5 w-5" />
                  Connect with MetaMask
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Step 2: Complete Profile</h3>

                <div className="space-y-2">
                  <Label htmlFor="wallet-username">Username</Label>
                  <Input id="wallet-username" placeholder="Choose a unique username" />
                </div>

                <div className="space-y-2">
                  <Label>I am a</Label>
                  <RadioGroup defaultValue="creator" className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="creator" id="wallet-creator" />
                      <Label htmlFor="wallet-creator">Creator</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fan" id="wallet-fan" />
                      <Label htmlFor="wallet-fan">Fan</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wallet-bio">Bio (Optional)</Label>
                  <Input id="wallet-bio" placeholder="Tell us about yourself" />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="wallet-terms" />
                  <Label htmlFor="wallet-terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="relative flex flex-col gap-4">
          <Button className="w-full">Sign & Register</Button>
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
