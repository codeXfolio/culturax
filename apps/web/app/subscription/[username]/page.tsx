import { SubscriptionPage } from "@/components/subscription/subscription-page"

export default function CreatorSubscriptionPage({
  params,
}: {
  params: { username: string }
}) {
  return <SubscriptionPage username={params.username} />
}
