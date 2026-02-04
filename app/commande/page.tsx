import { Suspense } from "react"
import CheckoutClient from "./checkout-client"

export default function CommandePage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <CheckoutClient />
    </Suspense>
  )
}
