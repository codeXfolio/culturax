import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ExternalLink } from "lucide-react";

export function TokenUsageExamples() {
  const examples = [
    {
      category: "content",
      items: [
        {
          title: "Premium Tutorial Access",
          description:
            "A creator offers exclusive access to their advanced tutorial series through token ownership.",
          implementation:
            "Token holders can unlock a special section of the website with premium tutorials.",
          benefits: [
            "Monetization of premium content",
            "Recurring revenue from token sales",
            "Community building",
          ],
          image: "/premium-content-display.png",
        },
        {
          title: "Early Content Release",
          description:
            "Token holders get early access to new content 7 days before public release.",
          implementation:
            "Content is released on a time-gated schedule based on token ownership.",
          benefits: [
            "Incentivizes token ownership",
            "Creates exclusivity",
            "Rewards loyal fans",
          ],
          image: "/early-access-sign.png",
        },
      ],
    },
    {
      category: "community",
      items: [
        {
          title: "VIP Community Access",
          description:
            "Token holders gain access to a private community with direct creator interaction.",
          implementation:
            "Discord integration with token-gated channels for different token tiers.",
          benefits: [
            "Stronger community bonds",
            "Direct feedback channel",
            "Higher engagement",
          ],
          image: "/vip-community.png",
        },
        {
          title: "Creator Mentorship Program",
          description:
            "Premium token holders get monthly 1-on-1 mentorship sessions with the creator.",
          implementation:
            "Booking system that verifies token ownership before allowing session booking.",
          benefits: [
            "High-value offering",
            "Personal connection with fans",
            "Premium pricing opportunity",
          ],
          image: "/mentorship-meeting.png",
        },
      ],
    },
    {
      category: "events",
      items: [
        {
          title: "Exclusive Virtual Events",
          description:
            "Token holders can attend special virtual events, workshops, and Q&A sessions.",
          implementation:
            "Token-gated virtual event platform with streaming capabilities.",
          benefits: [
            "Scalable event model",
            "Global reach",
            "Low overhead costs",
          ],
          image: "/virtual-event-concept.png",
        },
        {
          title: "In-Person Meetup Access",
          description:
            "Special token holders get priority access to limited-seat in-person events.",
          implementation:
            "Token verification at event check-in with tiered access levels.",
          benefits: [
            "Creates real-world connection",
            "High perceived value",
            "Memorable experiences",
          ],
          image: "/friendly-neighborhood-meetup.png",
        },
      ],
    },
    {
      category: "merchandise",
      items: [
        {
          title: "Limited Edition Merchandise",
          description:
            "Token holders get exclusive access to limited edition merchandise not available to the public.",
          implementation:
            "Token-gated store section with special products only visible to token holders.",
          benefits: [
            "Additional revenue stream",
            "Physical connection to brand",
            "Collectible value",
          ],
          image: "/limited-merchandise.png",
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-bold mb-2">
          Real-World Token Usage Examples
        </h2>
        <p className="text-muted-foreground">
          Explore how creators are using fan tokens to provide value to their
          communities
        </p>
      </div>

      <Tabs defaultValue="content" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="community">Community</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
        </TabsList>

        {examples.map((category) => (
          <TabsContent
            key={category.category}
            value={category.category}
            className="space-y-6 pt-6"
          >
            {category.items.map((example, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted">
                  <img
                    src={example.image || "/placeholder.svg"}
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{example.title}</CardTitle>
                    <Badge>
                      {category.category.charAt(0).toUpperCase() +
                        category.category.slice(1)}
                    </Badge>
                  </div>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Implementation</h4>
                    <p className="text-sm text-muted-foreground">
                      {example.implementation}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Benefits</h4>
                    <ul className="space-y-1">
                      {example.benefits.map((benefit, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
