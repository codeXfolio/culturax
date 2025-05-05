import { SubscriptionPage } from "@/components/subscription/subscription-page";

export default async function CreatorSubscriptionPage({
   params,
}: {
   params: { username: string };
}) {
   const { username } = await params;
   return <SubscriptionPage username={username} />;
}
