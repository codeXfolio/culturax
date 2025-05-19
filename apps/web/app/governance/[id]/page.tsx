import { ProposalDetailPage } from "@/components/governance/proposal-detail-page"

export default function ProposalDetail({ params }: { params: { id: string } }) {
  return <ProposalDetailPage id={params.id} />
}
