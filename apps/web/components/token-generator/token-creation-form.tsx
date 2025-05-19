"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { TokenPreview } from "@/components/token-generator/token-preview"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Token name must be at least 3 characters.",
  }),
  symbol: z.string().min(2, {
    message: "Token symbol must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  supply: z.number().min(100, {
    message: "Supply must be at least 100 tokens.",
  }),
  price: z.number().min(0.001, {
    message: "Price must be at least 0.001 ETH.",
  }),
  category: z.string(),
  transferable: z.boolean(),
  accessLevel: z.number(),
})

export function TokenCreationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      description: "",
      supply: 1000,
      price: 0.01,
      category: "content",
      transferable: true,
      accessLevel: 1,
    },
  })

  const watchedValues = form.watch()

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      // Show success message or redirect
      alert("Token created successfully!")
      form.reset()
    }, 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
              <TabsContent value="basic" className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Creator Fan Token" {...field} />
                      </FormControl>
                      <FormDescription>The full name of your fan token.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., CFT" {...field} maxLength={5} />
                      </FormControl>
                      <FormDescription>A short symbol for your token (2-5 characters).</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe what benefits this token provides to holders..."
                          {...field}
                          rows={4}
                        />
                      </FormControl>
                      <FormDescription>Explain what your token is for and its benefits.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="content">Content Access</SelectItem>
                          <SelectItem value="community">Community Membership</SelectItem>
                          <SelectItem value="events">Event Access</SelectItem>
                          <SelectItem value="merchandise">Merchandise</SelectItem>
                          <SelectItem value="utility">Utility</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>What is the primary purpose of this token?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <FormField
                  control={form.control}
                  name="supply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Supply: {field.value.toLocaleString()}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          min={100}
                          step={100}
                        />
                      </FormControl>
                      <FormDescription>The total number of tokens that will be created.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Price (ETH): {field.value}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                          min={0.001}
                          step={0.001}
                        />
                      </FormControl>
                      <FormDescription>Initial price per token in ETH.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transferable"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Transferable</FormLabel>
                        <FormDescription>Allow fans to transfer tokens to other users</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="accessLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Access Level: {field.value}</FormLabel>
                      <FormControl>
                        <Slider
                          defaultValue={[field.value]}
                          max={5}
                          min={1}
                          step={1}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                      </FormControl>
                      <FormDescription>Set the access level from 1 (basic) to 5 (premium)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Token...
                  </>
                ) : (
                  "Create Fan Token"
                )}
              </Button>
            </form>
          </Form>
        </Tabs>
      </div>

      <div className="hidden md:block">
        <h3 className="text-lg font-medium mb-4">Token Preview</h3>
        <TokenPreview tokenData={watchedValues} />
      </div>
    </div>
  )
}
