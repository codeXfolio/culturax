import { CollectionDetailPage } from "@/components/collections/collection-detail-page";

export default async function CollectionDetail({
   params,
}: {
   params: { id: string };
}) {
   const id = params.id;
   return <CollectionDetailPage id={id} />;
}
