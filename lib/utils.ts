// Import de la librairie clsx, utilisée pour construire des classes CSS conditionnelles
// ClassValue est un type TypeScript représentant les valeurs acceptées par clsx
import { clsx, type ClassValue } from 'clsx'

// Import de twMerge, qui permet de fusionner intelligemment les classes Tailwind CSS
// et d’éliminer les classes conflictuelles (ex : deux couleurs différentes)
import { twMerge } from 'tailwind-merge'

// Fonction utilitaire permettant de combiner des classes CSS de manière propre
export function cn(...inputs: ClassValue[]) {
  // clsx assemble les classes CSS en fonction des conditions
  // twMerge nettoie et fusionne les classes Tailwind pour éviter les conflits
  return twMerge(clsx(inputs))
}
