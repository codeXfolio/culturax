"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModeToggle } from "@/components/mode-toggle"
import { Wallet, Mail } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
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
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to your CreatorX account</CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-4">
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
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input id="password" type="password" placeholder="Enter your password" />
              </div>
              <Button className="w-full">Sign In</Button>
            </TabsContent>

            <TabsContent value="wallet" className="space-y-4">
              <Button className="w-full gap-2 h-12" size="lg">
                <Wallet className="h-5 w-5" />
                Connect with MetaMask
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <span className="relative bg-card px-2 text-xs text-muted-foreground">Or continue with</span>
              </div>

              <Button variant="outline" className="w-full">
                WalletConnect
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="relative flex flex-col gap-4">
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link href="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </div>
          <Button variant="ghost" className="w-full">
            Continue as Guest
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
