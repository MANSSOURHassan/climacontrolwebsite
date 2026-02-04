import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Mentions Légales | ClimaControl",
  description: "Mentions légales du site ClimaControl",
}

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Mentions Légales</h1>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="p-8 prose prose-slate max-w-none">
              <h2>Éditeur du site</h2>
              <p>
                <strong>ClimaControl</strong>
                <br />
                92 Route de Lattes
                <br />
                34430 Saint-Jean-de-Védas
                <br />
                France
              </p>
              <p>
                <strong>Email :</strong> climacontrol.clim@gmail.com
                <br />
                <strong>Téléphone :</strong> 04 67 20 04 44 / 06 82 82 34 34
              </p>

              <h2>Hébergement</h2>
              <p>
                Ce site est hébergé par Hostinger.
                <br />
                Hostinger International Ltd.
              </p>

              <h2>Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la
                propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents
                téléchargeables et les représentations iconographiques et photographiques.
              </p>

              <h2>Données personnelles</h2>
              <p>
                Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la
                Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression des
                données vous concernant.
              </p>

              <h2>Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic. En continuant
                à naviguer sur ce site, vous acceptez l'utilisation de cookies.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
