import ConfirmationClient from "./confirmation-client"

export default async function ConfirmationPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  return <ConfirmationClient commandeId={params.id} />
}
