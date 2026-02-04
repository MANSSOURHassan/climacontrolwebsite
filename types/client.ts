export interface Client {
  id: number
  email: string
  prenom: string
  nom: string
  telephone?: string
  adresse?: string
  code_postal?: string
  ville?: string
  type_client: "particulier" | "professionnel"
  siret?: string
  company?: string
  actif: boolean
  created_at: string
}

export interface AuthResponse {
  success: boolean
  message: string
  client?: Client
}
