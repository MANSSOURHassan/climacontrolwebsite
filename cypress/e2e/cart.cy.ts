/// <reference types="cypress" />

describe('Panier', () => {
    beforeEach(() => {
        // Vider le localStorage avant chaque test
        cy.clearLocalStorage()
    })

    it('affiche un message quand le panier est vide', () => {
        cy.visit('/panier')
        cy.contains(/panier.*vide|aucun.*article|votre panier est vide/i).should('be.visible')
    })

    it('affiche un lien pour continuer les achats', () => {
        cy.visit('/panier')
        cy.contains(/continuer|voir.*produits|nos produits|Découvrir/i).should('be.visible')
    })

    it('peut ajouter un produit au panier', () => {
        // Aller sur la page produits
        cy.visit('/produits')
        cy.wait(1000)

        // Cliquer sur le premier bouton "Ajouter au panier"
        cy.contains('Ajouter au panier').first().click({ force: true })

        // Vérifier le toast de confirmation
        cy.contains('Produit ajouté au panier', { timeout: 5000 }).should('be.visible')
    })

    it('affiche les produits ajoutés au panier', () => {
        // Ajouter un produit d'abord
        cy.visit('/produits')
        cy.wait(1000)

        cy.contains('Ajouter au panier').first().click({ force: true })
        cy.wait(1000)

        // Aller au panier
        cy.visit('/panier')
        cy.wait(500)

        // Vérifier qu'il y a un produit (le prix en €)
        cy.contains('€').should('be.visible')
    })
})

describe('Processus de commande', () => {
    it('peut aller vers la page commande depuis le panier', () => {
        // Ajouter un produit
        cy.visit('/produits')
        cy.wait(1000)

        cy.contains('Ajouter au panier').first().click({ force: true })
        cy.wait(1000)

        // Aller au panier
        cy.visit('/panier')
        cy.wait(500)

        // Chercher le bouton commander et cliquer
        cy.contains(/Finaliser ma commande|Commander|Passer|Valider|Checkout/i).click({ force: true })

        cy.url().should('include', '/commande')
    })
})
