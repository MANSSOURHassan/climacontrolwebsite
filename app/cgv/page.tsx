import { Card, CardContent } from "@/components/ui/card"

// Métadonnées SEO
export const metadata = {
  title: "Conditions Générales de Vente | ClimaControl",
  description: "Conditions générales de vente ClimaControl",
}

export default function CGVPage() {
  return (
    // Conteneur principal : prend au moins toute la hauteur de l'écran
    <main className="min-h-screen">

      {/* Section d'en-tête */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
        {/* 
          bg-gradient-to-br : gradient du coin supérieur gauche vers le coin inférieur droit
          from-primary/5 : couleur de départ (teinte primaire avec 5% d'opacité)
          via-background : couleur intermédiaire
          to-accent/5 : couleur de fin (teinte accent avec 5% d'opacité)
          py-16 : padding vertical 4rem (64px)
        */}
        <div className="container mx-auto px-4">
          {/* 
            container : largeur max adaptée à l’écran + centrage
            mx-auto : marge horizontale auto (centre le contenu)
            px-4 : padding horizontal 1rem (16px)
          */}
          <div className="max-w-3xl mx-auto text-center">
            {/* 
              max-w-3xl : largeur max 768px
              text-center : centre le texte
            */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Conditions Générales de Vente
            </h1>
            {/* 
              text-4xl : taille de texte 2.25rem (36px)
              md:text-5xl : taille 3rem (48px) sur écrans medium+
              font-bold : texte en gras
              mb-6 : margin bottom 1.5rem (24px)
            */}
          </div>
        </div>
      </section>

      {/* Section principale CGV */}
      <section className="py-20">
        {/* py-20 : padding vertical 5rem (80px) */}
        <div className="container mx-auto px-4 max-w-4xl">
          {/* max-w-4xl : largeur max 1024px */}
          <Card>
            <CardContent className="p-8 prose prose-slate max-w-none">
              {/* 
                p-8 : padding 2rem (32px)
                prose : styles typographiques automatiques (headings, paragraphes)
                prose-slate : couleur du texte gris foncé pour le thème clair
                max-w-none : pas de limite de largeur pour le contenu du prose
              */}

              <h2>1. Objet</h2>
              <p>
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre
                ClimaControl et ses clients dans le cadre de la vente de produits et services de climatisation,
                chauffage et pompes à chaleur.
              </p>

              <h2>2. Commandes</h2>
              <p>
                Toute commande implique l'acceptation sans réserve des présentes CGV. Les commandes peuvent être passées
                par téléphone, email ou via notre formulaire de devis en ligne.
              </p>

              <h2>3. Prix</h2>
              <p>
                Les prix sont indiqués en euros TTC. Ils incluent la TVA applicable au jour de la commande. ClimaControl
                se réserve le droit de modifier ses tarifs à tout moment, les produits étant facturés sur la base des
                tarifs en vigueur au moment de l'enregistrement de la commande.
              </p>

              <h2>4. Paiement</h2>
              <p>Le règlement peut s'effectuer par :</p>
              <ul>
                <li>Virement bancaire</li>
                <li>Chèque</li>
                <li>Carte bancaire</li>
                <li>Espèces (dans les limites légales)</li>
              </ul>
              <p>
                Un acompte peut être demandé à la commande. Le solde est généralement payable à l'achèvement des
                travaux.
              </p>

              <h2>5. Livraison et Installation</h2>
              <p>
                Les délais de livraison et d'installation sont communiqués à titre indicatif. ClimaControl s'efforce de
                respecter les délais annoncés mais ne peut être tenu responsable des retards dus à des causes
                indépendantes de sa volonté.
              </p>

              <h2>6. Garanties</h2>
              <p>
                Tous nos produits bénéficient de la garantie constructeur. Les installations sont garanties 2 ans pièces
                et main d'œuvre, et bénéficient de la garantie décennale conformément à la législation en vigueur.
              </p>

              <h2>7. Service après-vente</h2>
              <p>
                ClimaControl assure un service après-vente et propose des contrats d'entretien pour garantir le bon
                fonctionnement de vos équipements.
              </p>

              <h2>8. Droit de rétractation</h2>
              <p>
                Conformément à la législation, vous disposez d'un délai de 14 jours pour exercer votre droit de
                rétractation pour les ventes à distance, hors installations déjà réalisées.
              </p>

              <h2>9. Litiges</h2>
              <p>
                En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les
                tribunaux français seront seuls compétents.
              </p>

              <h2>Contact</h2>
              <p>
                Pour toute question concernant nos CGV :
                <br />
                Email : <a href="mailto:climacontrol.clim@gmail.com">climacontrol.clim@gmail.com</a>
                <br />
                Téléphone : 04 67 20 04 44 / 06 82 82 34 34
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
