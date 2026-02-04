/// <reference types="cypress" />

describe('Page Simulateur', () => {
    beforeEach(() => {
        cy.visit('/simulateur')
    })

    it('affiche le titre de la page', () => {
        cy.get('h1').should('contain', 'Simulateur de Puissance')
        cy.contains('Trouvez la climatisation idéale').should('be.visible')
    })

    it('affiche l\'étape 1 - Choix de la pièce', () => {
        cy.contains('Votre Pièce').should('be.visible')
        cy.contains('Quelle pièce souhaitez-vous climatiser').should('be.visible')
    })

    it('affiche les options de type de pièce', () => {
        cy.contains('Chambre').should('be.visible')
        cy.contains('Salon / Séjour').should('be.visible')
        cy.contains('Bureau').should('be.visible')
    })

    it('affiche les sliders de surface et hauteur', () => {
        cy.contains('Surface de la pièce').should('be.visible')
        cy.contains('Hauteur sous plafond').should('be.visible')
    })

    it('peut passer à l\'étape 2', () => {
        cy.contains('Suivant').click({ force: true })
        cy.contains('Détails Techniques').should('be.visible')
    })

    it('affiche les options d\'isolation à l\'étape 2', () => {
        cy.contains('Suivant').click({ force: true })
        cy.contains('Qualité de l\'isolation').should('be.visible')
        cy.contains('Excellent (RT2012 / RE2020)').should('be.visible')
        cy.contains('Bonne').should('be.visible')
        cy.contains('Moyenne').should('be.visible')
        cy.contains('Faible').should('be.visible')
    })

    it('affiche les options d\'orientation à l\'étape 2', () => {
        cy.contains('Suivant').click({ force: true })
        cy.contains('Orientation de la fenêtre principale').should('be.visible')
        cy.contains('Nord').should('be.visible')
        cy.contains('Sud').should('be.visible')
        cy.contains('Est').should('be.visible')
        cy.contains('Ouest').should('be.visible')
    })

    it('peut revenir à l\'étape 1', () => {
        cy.contains('Suivant').click({ force: true })
        cy.contains('Retour').click({ force: true })
        cy.contains('Votre Pièce').should('be.visible')
    })

    it('peut calculer la puissance recommandée', () => {
        // Étape 1 - Sélectionner Salon
        cy.contains('Salon / Séjour').click({ force: true })
        cy.contains('Suivant').click({ force: true })

        // Étape 2 - Sélectionner isolation et cliquer calculer
        cy.contains('Bonne').click({ force: true })
        cy.contains('Sud').click({ force: true })
        cy.contains('Calculer').click({ force: true })

        // Étape 3 - Vérifier le résultat
        cy.contains('Votre Résultat').should('be.visible')
        cy.contains('Puissance recommandée').should('be.visible')
        cy.contains('kW').should('be.visible')
    })

    it('affiche les conseils après calcul', () => {
        cy.contains('Suivant').click({ force: true })
        cy.contains('Calculer').click({ force: true })

        cy.contains('Notre conseil').should('be.visible')
        cy.contains('Voir les modèles compatibles').should('be.visible')
    })

    it('peut recommencer la simulation', () => {
        cy.contains('Suivant').click({ force: true })
        cy.contains('Calculer').click({ force: true })

        cy.contains('Recommencer la simulation').click({ force: true })
        cy.contains('Votre Pièce').should('be.visible')
    })
})
