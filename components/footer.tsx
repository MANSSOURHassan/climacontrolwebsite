import Link from "next/link" // Import du composant Link de Next.js pour la navigation côté client
import Image from "next/image" // Import du composant Image de Next.js pour gérer les images optimisées
import { Phone, Mail, MapPin } from "lucide-react" // Import des icônes de téléphone, mail et localisation

export function Footer() { // Déclaration du composant Footer
  return (
    <footer className="bg-gray-100 border-t mt-16">
      {/* Conteneur principal du footer avec fond gris clair, bordure en haut et marge supérieure */}
      <div className="container mx-auto px-4 py-10">
        {/* Conteneur centralisé avec padding horizontal et vertical */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Grille responsive : 1 colonne mobile, 2 colonnes tablette, 4 colonnes desktop */}

          {/* Logo & Description */}
          <div>
            <Image src="/logo.jpg" alt="ClimaControl" width={200} height={67} className="h-14 w-auto mb-4" />
            {/* Logo de l'entreprise */}
            <p className="text-sm text-muted-foreground leading-relaxed">
              Votre spécialiste en climatisation, chauffage et pompes à chaleur. Solutions professionnelles pour
              particuliers et entreprises.
            </p>
            {/* Description de l'entreprise */}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {/* Liste des liens de navigation */}
              <li>
                <Link href="/a-propos" className="text-muted-foreground hover:text-primary transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/produits" className="text-muted-foreground hover:text-primary transition-colors">
                  Boutique Produits
                </Link>
              </li>
              <li>
                <Link href="/simulateur" className="text-muted-foreground hover:text-primary transition-colors">
                  Simulateur de Puissance
                </Link>
              </li>
              <li>
                <Link href="/rendez-vous" className="text-muted-foreground hover:text-primary transition-colors">
                  Prendre Rendez-vous
                </Link>
              </li>
              <li>
                <Link href="/pro" className="text-muted-foreground font-semibold text-yellow-700 hover:text-primary transition-colors">
                  Espace Professionnel
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Nos Services</h3>
            <ul className="space-y-2 text-sm">
              {/* Liste des services proposés */}
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Installation
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Dépannage
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Entretien
                </Link>
              </li>
              <li>
                <Link href="/compte" className="text-muted-foreground hover:text-primary transition-colors">
                  Espace Client
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              {/* Adresse */}
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  92 Rte de Lattes
                  <br />
                  34430 Saint-Jean-de-Védas
                </span>
              </li>
              {/* Téléphones */}
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:0467200444" className="text-muted-foreground hover:text-primary transition-colors">
                    04 67 20 04 44
                  </a>
                  <a href="tel:0682823434" className="text-muted-foreground hover:text-primary transition-colors">
                    06 82 82 34 34
                  </a>
                </div>
              </li>
              {/* Email */}
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a
                  href="mailto:climacontrol.clim@gmail.com"
                  className="text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  climacontrol.clim@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 ClimaControl. Tous droits réservés.</p>
          <div className="flex gap-6">
            {/* Liens légaux */}
            <Link href="/mentions-legales" className="hover:text-primary transition-colors">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-primary transition-colors">
              Confidentialité
            </Link>
            <Link href="/cgv" className="hover:text-primary transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
