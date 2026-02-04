import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Politique de Confidentialité | ClimaControl",
  description: "Politique de confidentialité et protection des données ClimaControl",
}

export default function ConfidentialitePage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Politique de Confidentialité</h1>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-8 prose prose-slate max-w-none">
              <h2>Protection de vos données personnelles</h2>
              <p>
                ClimaControl s'engage à protéger la vie privée de ses utilisateurs et clients. Cette politique de
                confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles.
              </p>

              <h2>Données collectées</h2>
              <p>Nous collectons les informations suivantes :</p>
              <ul>
                <li>Nom, prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale</li>
                <li>Informations relatives à vos demandes de devis et commandes</li>
              </ul>

              <h2>Utilisation des données</h2>
              <p>Vos données sont utilisées pour :</p>
              <ul>
                <li>Traiter vos demandes de devis et commandes</li>
                <li>Vous contacter concernant nos services</li>
                <li>Améliorer nos services et votre expérience client</li>
                <li>Vous envoyer des informations marketing (avec votre consentement)</li>
              </ul>

              <h2>Conservation des données</h2>
              <p>
                Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles
                ont été collectées, conformément à la réglementation en vigueur.
              </p>

              <h2>Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul>
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition au traitement</li>
              </ul>
              <p>
                Pour exercer ces droits, contactez-nous à :{" "}
                <a href="mailto:climacontrol.clim@gmail.com">climacontrol.clim@gmail.com</a>
              </p>

              <h2>Sécurité</h2>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données
                contre tout accès non autorisé, modification, divulgation ou destruction.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
