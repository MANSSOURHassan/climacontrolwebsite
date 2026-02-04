/// <reference types="cypress" />

describe('Navigation', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('le logo/titre retourne à l\'accueil', () => {
        cy.visit('/contact')
        cy.get('header').find('a[href="/"]').first().click()
        cy.url().should('eq', Cypress.config().baseUrl + '/')
    })

    it('navigue vers la page Produits', () => {
        cy.get('header').contains('Produits').click()
        cy.url().should('include', '/produits')
    })

    it('navigue vers la page Services', () => {
        cy.get('header').contains('Services').click()
        cy.url().should('include', '/services')
    })

    it('navigue vers la page À propos', () => {
        cy.get('header').contains('À propos').click()
        cy.url().should('include', '/a-propos')
    })

    it('navigue vers la page Contact', () => {
        cy.get('header').contains('Contact').click()
        cy.url().should('include', '/contact')
    })

    it('navigue vers le panier', () => {
        cy.get('header').find('a[href="/panier"]').click()
        cy.url().should('include', '/panier')
    })

    it('le footer contient les liens légaux', () => {
        cy.get('footer').should('be.visible')
        cy.get('footer').contains('Mentions légales').should('be.visible')
        cy.get('footer').contains('CGV').should('be.visible')
    })
})
