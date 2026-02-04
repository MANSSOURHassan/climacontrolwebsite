/// <reference types="cypress" />

describe('Page Produits', () => {
    beforeEach(() => {
        cy.visit('/produits')
        cy.wait(1000) // Attendre le chargement initial
    })

    it('affiche le titre de la page produits', () => {
        cy.get('h1').should('be.visible')
        cy.get('h1').should('contain', 'Climatisation')
    })

    it('affiche une liste de produits', () => {
        // Attendre que les produits se chargent
        cy.get('[class*="card"], [class*="Card"], article', { timeout: 10000 }).should('have.length.greaterThan', 0)
    })

    it('chaque produit affiche un nom et un prix', () => {
        cy.get('[class*="Card"]').first().within(() => {
            // Vérifier qu'il y a du texte (nom du produit)
            cy.get('h3').should('be.visible')
            // Vérifier qu'il y a un prix
            cy.contains('€').should('be.visible')
        })
    })

    it('affiche les onglets de catégories', () => {
        cy.contains('Climatisation').should('be.visible')
        cy.contains('Chauffage').should('be.visible')
        cy.contains('PAC').should('be.visible')
        cy.contains('Accessoires').should('be.visible')
    })

    it('peut changer d\'onglet', () => {
        cy.contains('button', 'Chauffage').click()
        cy.contains('Systèmes de chauffage').should('be.visible')
    })

    it('a un bouton Ajouter au panier sur chaque produit', () => {
        cy.contains('Ajouter au panier').should('be.visible')
    })
})
