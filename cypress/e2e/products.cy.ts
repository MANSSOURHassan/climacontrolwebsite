/// <reference types="cypress" />

describe('Page Produits', () => {
    beforeEach(() => {
        cy.visit('/produits')
        // Attendre que le spinner disparaisse et que les produits se chargent
        cy.get('[class*="animate-spin"]', { timeout: 15000 }).should('not.exist')
        cy.wait(2000) // Attendre le chargement des produits depuis l'API
    })

    it('affiche le titre de la page produits', () => {
        cy.get('h1').should('be.visible')
        cy.get('h1').should('contain', 'climatisation')
    })

    it('affiche une liste de produits', () => {
        // Attendre que les produits se chargent - chercher les cartes produit
        cy.get('article, [data-testid="product-card"], .grid > div').should('have.length.greaterThan', 0)
    })

    it('chaque produit affiche un nom et un prix', () => {
        // Chercher les cartes produit par leur structure (contenant h3 et prix)
        cy.get('h3').first().should('be.visible')
        cy.contains('€').should('be.visible')
    })

    it('affiche les filtres de catégories', () => {
        // Les catégories sont affichées comme des labels de checkbox dans le filtre
        cy.get('label').contains('climatisation').should('be.visible')
        cy.get('label').contains('chauffage').should('be.visible')
        cy.get('label').contains('pompes a chaleur').should('be.visible')
        cy.get('label').contains('accessoires').should('be.visible')
    })

    it('peut filtrer par catégorie', () => {
        // Cliquer sur un filtre de catégorie
        cy.get('label').contains('climatisation').click()
        cy.wait(2000) // Attendre que les produits se rechargent
        // Vérifier que des produits sont toujours affichés (chercher les prix)
        cy.contains('€', { timeout: 10000 }).should('be.visible')
    })

    it('a un bouton Ajouter au panier sur chaque produit', () => {
        cy.contains('Ajouter au panier').should('be.visible')
    })

    it('peut rechercher un produit', () => {
        // Trouver le champ de recherche et taper
        cy.get('input[placeholder*="Rechercher"]').type('climatisation')
        cy.wait(1000)
        // Vérifier que des résultats s'affichent
        cy.contains('€').should('be.visible')
    })
})
