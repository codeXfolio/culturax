"use client";

import { Button } from "@/components/ui/button";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/mode-toggle";
import {
   ArrowLeft,
   Sparkles,
   MessageSquare,
   Calendar,
   Mic,
   Send,
   Copy,
   Check,
   RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function AiToolsPage() {
   const [copied, setCopied] = useState(false);
   const [generating, setGenerating] = useState(false);
   const [captionInput, setCaptionInput] = useState("");
   const [captionResult, setCaptionResult] = useState("");

   const handleGenerateCaption = () => {
      if (!captionInput.trim()) return;

      setGenerating(true);
      setCaptionResult("");

      // Simulate AI generation
      setTimeout(() => {
         const captions = [
            "Exploring new dimensions of creativity with my latest digital art piece. What worlds do you see in these colors? #DigitalArt #NFTCommunity",
            "Just dropped my newest creation into the digital universe. This piece represents the intersection of technology and emotion. #CreatorX #DigitalArtist",
            "Pushing boundaries and breaking digital barriers with this new artwork. Limited edition NFT available now on CreatorX. #NFTCollection #DigitalCreation",
         ];

         setCaptionResult(
            captions[Math.floor(Math.random() * captions.length)]
         );
         setGenerating(false);
      }, 2000);
   };

   const handleCopy = () => {
      navigator.clipboard.writeText(captionResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className="min-h-screen bg-background">
         <header className="border-b border-border/40 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
            <div className="container flex items-center justify-between h-16">
               <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild>
                     <Link href="/creator-profile">
                        <ArrowLeft className="h-5 w-5" />
                     </Link>
                  </Button>
                  <div className="flex items-center gap-2">
                     <Sparkles className="h-5 w-5 text-purple-500" />
                     <span className="font-bold text-xl">AI Tools</span>
                  </div>
               </div>
               <ModeToggle />
            </div>
         </header>

         <main className="container pt-24 pb-16 max-w-5xl">
            <div className="mb-8">
               <h1 className="text-3xl font-bold mb-2">AI Creation Tools</h1>
               <p className="text-muted-foreground">
                  Enhance your content with our AI-powered tools designed
                  specifically for creators.
               </p>
            </div>

            <Tabs defaultValue="caption" className="space-y-6">
               <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                  <TabsTrigger
                     value="caption"
                     className="flex items-center gap-2"
                  >
                     <MessageSquare className="h-4 w-4" />
                     <span>Caption Generator</span>
                  </TabsTrigger>
                  <TabsTrigger
                     value="scheduler"
                     className="flex items-center gap-2"
                  >
                     <Calendar className="h-4 w-4" />
                     <span>Post Scheduler</span>
                  </TabsTrigger>
                  <TabsTrigger
                     value="voiceover"
                     className="flex items-center gap-2"
                  >
                     <Mic className="h-4 w-4" />
                     <span>AI Voiceover</span>
                  </TabsTrigger>
                  <TabsTrigger
                     value="assistant"
                     className="flex items-center gap-2"
                  >
                     <Sparkles className="h-4 w-4" />
                     <span>Chat Assistant</span>
                  </TabsTrigger>
               </TabsList>

               {/* Caption Generator */}
               <TabsContent value="caption" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card className="border border-border/50">
                        <CardHeader>
                           <CardTitle>Caption Generator</CardTitle>
                           <CardDescription>
                              Generate engaging captions for your content with
                              AI.
                           </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="space-y-2">
                              <Label htmlFor="caption-input">
                                 Describe your content
                              </Label>
                              <Textarea
                                 id="caption-input"
                                 placeholder="Describe your image, video, or NFT in detail..."
                                 className="min-h-[120px]"
                                 value={captionInput}
                                 onChange={(e) =>
                                    setCaptionInput(e.target.value)
                                 }
                              />
                           </div>
                           <div className="flex items-center gap-2">
                              <Label htmlFor="tone" className="min-w-[80px]">
                                 Tone
                              </Label>
                              <select
                                 id="tone"
                                 className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              >
                                 <option value="professional">
                                    Professional
                                 </option>
                                 <option value="casual">Casual</option>
                                 <option value="enthusiastic">
                                    Enthusiastic
                                 </option>
                                 <option value="informative">
                                    Informative
                                 </option>
                                 <option value="humorous">Humorous</option>
                              </select>
                           </div>
                           <div className="flex items-center gap-2">
                              <Label
                                 htmlFor="hashtags"
                                 className="min-w-[80px]"
                              >
                                 Hashtags
                              </Label>
                              <Input
                                 id="hashtags"
                                 placeholder="e.g. 5"
                                 type="number"
                                 min="0"
                                 max="10"
                                 defaultValue="3"
                              />
                           </div>
                           <Button
                              className="w-full gap-2"
                              onClick={handleGenerateCaption}
                              disabled={generating || !captionInput.trim()}
                           >
                              {generating ? (
                                 <>
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                    Generating...
                                 </>
                              ) : (
                                 <>
                                    <Sparkles className="h-4 w-4" />
                                    Generate Caption
                                 </>
                              )}
                           </Button>
                        </CardContent>
                     </Card>

                     <Card className="border border-border/50">
                        <CardHeader>
                           <CardTitle>Results</CardTitle>
                           <CardDescription>
                              Your AI-generated caption will appear here.
                           </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="min-h-[200px] rounded-md border border-border p-4 relative">
                              {captionResult ? (
                                 <>
                                    <p className="text-sm">{captionResult}</p>
                                    <Button
                                       variant="ghost"
                                       size="icon"
                                       className="absolute top-2 right-2"
                                       onClick={handleCopy}
                                    >
                                       {copied ? (
                                          <Check className="h-4 w-4 text-green-500" />
                                       ) : (
                                          <Copy className="h-4 w-4" />
                                       )}
                                    </Button>
                                 </>
                              ) : (
                                 <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                                    {generating ? (
                                       <div className="flex flex-col items-center gap-2">
                                          <RefreshCw className="h-5 w-5 animate-spin" />
                                          <p>Generating caption...</p>
                                       </div>
                                    ) : (
                                       <p>
                                          Your generated caption will appear
                                          here
                                       </p>
                                    )}
                                 </div>
                              )}
                           </div>

                           {captionResult && (
                              <div className="flex gap-2">
                                 <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={() => setCaptionResult("")}
                                 >
                                    Clear
                                 </Button>
                                 <Button className="flex-1 gap-2">
                                    <Send className="h-4 w-4" />
                                    Use in Post
                                 </Button>
                              </div>
                           )}
                        </CardContent>
                     </Card>
                  </div>
               </TabsContent>

               {/* Post Scheduler */}
               <TabsContent value="scheduler">
                  <Card className="border border-border/50">
                     <CardHeader>
                        <CardTitle>Post Scheduler</CardTitle>
                        <CardDescription>
                           Schedule your content for optimal engagement times.
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                           Coming soon...
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* AI Voiceover */}
               <TabsContent value="voiceover">
                  <Card className="border border-border/50">
                     <CardHeader>
                        <CardTitle>AI Voiceover</CardTitle>
                        <CardDescription>
                           Convert your text to natural-sounding speech.
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                           Coming soon...
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>

               {/* Chat Assistant */}
               <TabsContent value="assistant">
                  <Card className="border border-border/50">
                     <CardHeader>
                        <CardTitle>AI Chat Assistant</CardTitle>
                        <CardDescription>
                           Get creative ideas and assistance from your AI
                           helper.
                        </CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                           Coming soon...
                        </div>
                     </CardContent>
                  </Card>
               </TabsContent>
            </Tabs>
         </main>
      </div>
   );
}
