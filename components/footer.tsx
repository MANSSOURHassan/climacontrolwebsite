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

            {/* Réseaux sociaux */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://www.facebook.com/share/1FomyzBJVW/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-[#1877F2] hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/climacontrol_montpellier?igsh=MTN2YXl0dXd3aHEx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743] hover:text-white transition-all duration-300"
                style={{}}
                aria-label="Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/climacontrol/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-600 hover:bg-[#0A66C2] hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
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
