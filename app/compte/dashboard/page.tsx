import DashboardClient from "./dashboard-client"

export const metadata = {
  title: "Mon Tableau de Bord | ClimaControl",
  description: "Gérez vos commandes et devis ClimaControl",
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <DashboardClient />
    </main>
  )
}
