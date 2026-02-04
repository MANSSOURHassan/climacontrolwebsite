// ***********************************************************
// Custom Cypress Commands
// ***********************************************************

// Commande pour ajouter un produit au panier
Cypress.Commands.add('addToCart', (productIndex = 0) => {
    cy.get('[data-testid="add-to-cart-btn"]').eq(productIndex).click()
})

// Commande pour vérifier le nombre d'articles dans le panier
Cypress.Commands.add('cartShouldHaveItems', (count: number) => {
    cy.get('[data-testid="cart-count"]').should('contain', count)
})

// Commande pour naviguer vers une page
Cypress.Commands.add('navigateTo', (page: string) => {
    cy.get(`a[href="/${page}"]`).first().click()
})

// Déclaration des types pour TypeScript
declare global {
    namespace Cypress {
        interface Chainable {
            addToCart(productIndex?: number): Chainable<void>
            cartShouldHaveItems(count: number): Chainable<void>
            navigateTo(page: string): Chainable<void>
        }
    }
}

export { }
