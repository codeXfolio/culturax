import { CollectionDetailPage } from "@/components/collections/collection-detail-page"

export default function CollectionDetail({ params }: { params: { id: string } }) {
  return <CollectionDetailPage id={params.id} />
}
