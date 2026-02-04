/// <reference types="cypress" />

/**
 * Test E2E Rendez-vous - Parcours client complet avec captures d'écran
 * Simule un client réel qui prend rendez-vous pour une installation
 */
describe('Parcours Client - Prise de Rendez-vous', () => {

    it('Parcours complet de prise de rendez-vous avec captures d\'écran', () => {
        // ===== ÉTAPE 1: Arrivée sur la page =====
        cy.visit('/rendez-vous')
        cy.wait(1000)
        cy.screenshot('01-rdv-page-accueil')

        // Vérifier que la page est bien chargée
        cy.get('h1').should('contain', 'Prendre Rendez-vous')

        // ===== ÉTAPE 2: Sélection d'une date dans le calendrier =====
        // Cliquer sur un jour disponible (on prend un jour du calendrier visible)
        cy.get('[role="grid"] button:not([disabled])').first().click({ force: true })
        cy.wait(500)
        cy.screenshot('02-rdv-selection-date')

        // ===== ÉTAPE 3: Sélection du type de service =====
        cy.contains('Sélectionner...').click({ force: true })
        cy.wait(300)
        cy.screenshot('03-rdv-menu-services-ouvert')

        // Sélectionner "Installation"
        cy.contains('Installation').click({ force: true })
        cy.wait(300)
        cy.screenshot('04-rdv-service-selectionne')

        // ===== ÉTAPE 4: Sélection du créneau horaire =====
        cy.contains('Préférence...').click({ force: true })
        cy.wait(300)
        cy.screenshot('05-rdv-menu-creneau-ouvert')

        // Sélectionner "Matin"
        cy.contains('Matin (8h - 12h)').click({ force: true })
        cy.wait(300)
        cy.screenshot('06-rdv-creneau-selectionne')

        // ===== ÉTAPE 5: Remplissage des coordonnées =====
        cy.get('input#name').type('Jean Dupont')
        cy.screenshot('07-rdv-saisie-nom')

        cy.get('input#phone').type('06 12 34 56 78')
        cy.screenshot('08-rdv-saisie-telephone')

        cy.get('input#address').type('123 Avenue des Champs-Élysées, 75008 Paris')
        cy.screenshot('09-rdv-saisie-adresse')

        cy.get('textarea#notes').type('Interphone: Dupont, 3ème étage gauche, code portail 1234')
        cy.screenshot('10-rdv-saisie-notes')

        // ===== ÉTAPE 6: Formulaire rempli - Vue complète =====
        // Scroller pour voir le formulaire complet
        cy.scrollTo('top')
        cy.wait(300)
        cy.screenshot('11-rdv-formulaire-complet-haut')

        cy.scrollTo('bottom')
        cy.wait(300)
        cy.screenshot('12-rdv-formulaire-complet-bas')

        // ===== ÉTAPE 7: Bouton de confirmation =====
        cy.contains('Confirmer le rendez-vous').should('be.visible')
        cy.screenshot('13-rdv-avant-confirmation')

        // Note: On ne clique pas sur confirmer pour éviter l'envoi réel à Supabase
        // cy.contains('Confirmer le rendez-vous').click({ force: true })
    })
})
