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
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../navigation/header";
import { Sidebar } from "../navigation/sidebar";
import { fetchProfile } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function AiToolsPage() {
   const router = useRouter();
   const [copied, setCopied] = useState(false);
   const [generating, setGenerating] = useState(false);
   const [captionInput, setCaptionInput] = useState("");
   const [captionResult, setCaptionResult] = useState("");
   const [hashtags, setHashtags] = useState<string[]>([]);
   const [profile, setProfile] = useState<{
      avatar: string;
      accountType: string;
   } | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [tone, setTone] = useState("professional");
   const [hashtagCount, setHashtagCount] = useState(3);
   const [address, setAddress] = useState<string | null>(null);
   const [signature, setSignature] = useState<string | null>(null);

   useEffect(() => {
      fetchProfile().then((profile) => {
         setProfile(profile);
      });
   }, []);

   const handleGenerateCaption = async () => {
      if (!captionInput.trim()) return;

      setGenerating(true);
      setCaptionResult("");
      setError(null);

      try {
         const authSignature = localStorage.getItem("authSignature");
         const authAddress = localStorage.getItem("authAddress");

         const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/api/ai/generate-caption",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
                  "x-eth-signature": authSignature || "",
                  "x-eth-address": authAddress || "",
               },
               body: JSON.stringify({
                  description: captionInput,
                  tone: tone,
                  totalHashtags: hashtagCount,
               }),
            }
         );

         if (!response.ok) {
            throw new Error("Failed to generate caption");
         }

         const data = await response.json();
         setCaptionResult(data.caption);
         setHashtags(data.hashtags || []);
      } catch (err) {
         setError("Failed to generate caption. Please try again.");
         console.error("Error generating caption:", err);
      } finally {
         setGenerating(false);
      }
   };

   const handleCopy = () => {
      const textToCopy = `${captionResult}\n\n${hashtags.join(" ")}`;
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const handleClear = () => {
      setCaptionResult("");
      setCaptionInput("");
      setHashtags([]);
      setError(null);
   };

   const handleUseInPost = () => {
      const postData = {
         caption: captionResult,
         hashtags: hashtags,
      };
      const encodedData = encodeURIComponent(JSON.stringify(postData));
      router.push(`/feed?caption=${encodedData}`);
   };

   return (
      <div className="min-h-screen bg-background">
         <Header />

         <div className="flex pt-16">
            <Sidebar profile={profile} />
            <main className="container pt-10z pb-16 max-w-5xl">
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
                                 Generate engaging captions for your content
                                 with AI.
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
                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    value={tone}
                                    onChange={(e) => setTone(e.target.value)}
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
                                    value={hashtagCount}
                                    onChange={(e) =>
                                       setHashtagCount(Number(e.target.value))
                                    }
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
                                 {error ? (
                                    <div className="text-red-500 text-sm">
                                       {error}
                                    </div>
                                 ) : captionResult ? (
                                    <>
                                       <p className="text-sm mb-4">
                                          {captionResult}
                                       </p>
                                       {hashtags.length > 0 && (
                                          <div className="flex flex-wrap gap-2">
                                             {hashtags.map((tag, index) => (
                                                <Badge
                                                   key={index}
                                                   variant="secondary"
                                                >
                                                   {tag}
                                                </Badge>
                                             ))}
                                          </div>
                                       )}
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
                                       onClick={handleClear}
                                    >
                                       Clear
                                    </Button>
                                    <Button
                                       className="flex-1 gap-2"
                                       onClick={handleUseInPost}
                                    >
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
                              Schedule your content for optimal engagement
                              times.
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
      </div>
   );
}
