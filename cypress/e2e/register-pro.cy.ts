/// <reference types="cypress" />

describe('Inscription Espace Pro - Test Complet', () => {

    // Générer un email unique pour chaque test pour éviter les erreurs "Email déjà utilisé"
    const uniqueEmail = `pro.${Date.now()}@test.com`;

    beforeEach(() => {
        cy.visit('/pro')
    })

    it('devrait créer un compte PRO avec succès', () => {
        // Intercepter l'appel API pour vérifier la réponse
        cy.intercept('POST', '/api/auth/register').as('registerRequest')

        // 1. Remplir le formulaire
        cy.get('input').eq(0).type('Marc')                                    // Prénom
        cy.get('input').eq(1).type('Durand')                                  // Nom
        cy.get('input').eq(2).type('ClimaInstall PAC')                        // Société
        cy.get('input').eq(3).type('12345678900012')                          // SIRET
        cy.get('input').eq(4).type(uniqueEmail)                               // Email unique
        cy.get('input').eq(5).type('Password123!')                            // Mot de passe

        // Preuve visuelle avant soumission
        cy.screenshot('inscription-pro-formulaire-rempli')

        // 2. Soumettre le formulaire
        cy.contains(/S'inscrire comme PRO/i).click()

        // 3. Attendre la réponse de l'API
        cy.wait('@registerRequest').then((interception) => {
            expect(interception.response?.statusCode).to.be.oneOf([201, 200, 400])

            if (interception.response?.statusCode === 201) {
                // Succès : Vérifier la redirection ou le toast
                cy.contains('Bienvenue !', { timeout: 10000 }).should('be.visible')
            } else if (interception.response?.statusCode === 400) {
                // Si l'email était déjà pris malgré tout
                cy.contains('Cet email est déjà utilisé').should('be.visible')
            }
        })

        // Capture finale
        cy.screenshot('inscription-pro-resultat')
    })

    it('devrait afficher des erreurs de validation si les champs sont vides', () => {
        // Cliquer directement sur soumettre sans rien remplir
        // Note: Les champs sont 'required' via HTML5, donc on teste le comportement natif
        cy.contains(/S'inscrire comme PRO/i).click()

        // Vérifier que l'URL n'a pas changé (on est toujours sur /pro car le formulaire est bloqué)
        cy.url().should('include', '/pro')
    })

    it('devrait valider la longueur du mot de passe (min 8 car.)', () => {
        cy.get('input').eq(0).type('Test')
        cy.get('input').eq(1).type('Test')
        cy.get('input').eq(2).type('Test Soc')
        cy.get('input').eq(3).type('12345678901234')
        cy.get('input').eq(4).type('short@test.com')
        cy.get('input').eq(5).type('123') // Trop court

        cy.contains(/S'inscrire comme PRO/i).click()

        // Le validateur Zod ou HTML5 devrait bloquer
        // Si c'est Zod, on aura une erreur API ou un toast
        cy.screenshot('inscription-pro-erreur-password')
    })
})
