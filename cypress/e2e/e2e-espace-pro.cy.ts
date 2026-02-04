/// <reference types="cypress" />

/**
 * Test E2E Espace Pro - Parcours client professionnel complet avec captures d'écran
 * Simule un professionnel qui s'inscrit sur l'espace pro
 */
describe('Parcours Client - Inscription Espace Pro', () => {

    it('Parcours complet d\'inscription PRO avec captures d\'écran', () => {
        // ===== ÉTAPE 1: Arrivée sur la page =====
        cy.visit('/pro')
        cy.wait(1000)
        cy.screenshot('01-pro-page-accueil')

        // Vérifier que la page est bien chargée
        cy.get('h1').should('contain', 'Professionnels')

        // ===== ÉTAPE 2: Vue de la section avantages =====
        cy.contains('Pourquoi devenir partenaire').scrollIntoView()
        cy.wait(300)
        cy.screenshot('02-pro-section-avantages')

        // ===== ÉTAPE 3: Vue des 4 avantages =====
        cy.contains('Tarifs Préférentiels').should('be.visible')
        cy.contains('Support Prioritaire').should('be.visible')
        cy.screenshot('03-pro-liste-avantages')

        // ===== ÉTAPE 4: Scroll vers le formulaire =====
        cy.contains('Créer un compte PRO gratuit').scrollIntoView()
        cy.wait(300)
        cy.screenshot('04-pro-formulaire-vide')

        // ===== ÉTAPE 5: Remplissage du Prénom et Nom =====
        cy.get('input').eq(0).type('Pierre')
        cy.get('input').eq(1).type('Martin')
        cy.screenshot('05-pro-saisie-prenom-nom')

        // ===== ÉTAPE 6: Remplissage de la Société =====
        cy.get('input').eq(2).type('ClimaServices Pro SARL')
        cy.screenshot('06-pro-saisie-societe')

        // ===== ÉTAPE 7: Remplissage du SIRET =====
        cy.get('input').eq(3).type('123 456 789 00042')
        cy.screenshot('07-pro-saisie-siret')

        // ===== ÉTAPE 8: Remplissage de l'Email pro =====
        cy.get('input').eq(4).type('pierre.martin@climaservices-pro.fr')
        cy.screenshot('08-pro-saisie-email')

        // ===== ÉTAPE 9: Remplissage du mot de passe =====
        cy.get('input').eq(5).type('MonMotDePasseSecurise2024!')
        cy.screenshot('09-pro-saisie-password')

        // ===== ÉTAPE 10: Formulaire complet =====
        cy.scrollTo('top')
        cy.wait(300)
        cy.screenshot('10-pro-vue-complete-haut')

        cy.scrollTo('bottom')
        cy.wait(300)
        cy.screenshot('11-pro-formulaire-rempli')

        // ===== ÉTAPE 11: Bouton d'inscription visible =====
        cy.contains("S'inscrire comme PRO").should('be.visible')
        cy.screenshot('12-pro-avant-inscription')

        // ===== ÉTAPE 12: Vérifier les CGV =====
        cy.contains('CGV Pro').should('be.visible')
        cy.screenshot('13-pro-mention-cgv')

        // Note: On ne clique pas sur s'inscrire pour éviter l'envoi réel à l'API
        // cy.contains("S'inscrire comme PRO").click({ force: true })
    })
})
