/// <reference types="cypress" />

/**
 * Test E2E Simulateur - Parcours client complet avec captures d'écran
 * Simule un client réel qui utilise le simulateur de puissance
 */
describe('Parcours Client - Simulateur de Puissance', () => {

    it('Parcours complet du simulateur avec captures d\'écran', () => {
        // ===== ÉTAPE 1: Arrivée sur la page =====
        cy.visit('/simulateur')
        cy.wait(1000)
        cy.screenshot('01-simulateur-page-accueil')

        // Vérifier que la page est bien chargée
        cy.get('h1').should('contain', 'Simulateur de Puissance')

        // ===== ÉTAPE 2: Sélection du type de pièce =====
        cy.contains('Salon / Séjour').click({ force: true })
        cy.wait(500)
        cy.screenshot('02-simulateur-selection-piece')

        // ===== ÉTAPE 3: Ajuster la surface (slider) =====
        // On va taper directement la valeur dans le span si possible ou ajuster via slider
        // Le slider a une valeur par défaut de 20m²
        cy.screenshot('03-simulateur-surface-defaut')

        // ===== ÉTAPE 4: Cliquer sur Suivant =====
        cy.contains('Suivant').click({ force: true })
        cy.wait(500)
        cy.screenshot('04-simulateur-etape2-isolation')

        // Vérifier qu'on est à l'étape 2
        cy.contains('Détails Techniques').should('be.visible')

        // ===== ÉTAPE 5: Sélection de la qualité d'isolation =====
        cy.contains('Bonne').click({ force: true })
        cy.wait(300)
        cy.screenshot('05-simulateur-selection-isolation')

        // ===== ÉTAPE 6: Sélection de l'orientation =====
        cy.contains('Sud').click({ force: true })
        cy.wait(300)
        cy.screenshot('06-simulateur-selection-orientation')

        // ===== ÉTAPE 7: Calculer la puissance =====
        cy.contains('Calculer').click({ force: true })
        cy.wait(1000)
        cy.screenshot('07-simulateur-resultat-puissance')

        // Vérifier le résultat
        cy.contains('Puissance recommandée').should('be.visible')
        cy.contains('kW').should('be.visible')
        cy.contains('Notre conseil').should('be.visible')

        // ===== ÉTAPE 8: Screenshot du résultat final =====
        cy.screenshot('08-simulateur-conseil-final')

        // Vérifier le lien vers les produits
        cy.contains('Voir les modèles compatibles').should('be.visible')

        // ===== ÉTAPE 9: Cliquer pour voir les produits =====
        cy.screenshot('09-simulateur-avant-redirection-produits')
    })
})
