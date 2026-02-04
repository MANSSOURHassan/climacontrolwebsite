/// <reference types="cypress" />

describe('Page d\'accueil', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('affiche le hero section avec le titre principal', () => {
        cy.get('h1').should('be.visible')
        cy.get('h1').should('contain', 'excellence climatique')
    })

    it('affiche le badge "Depuis 2009"', () => {
        cy.contains('Depuis 2009').should('be.visible')
    })

    it('affiche le bouton "Devis gratuit"', () => {
        cy.contains('Devis gratuit').should('be.visible')
        cy.contains('Devis gratuit').should('have.attr', 'href', '/devis')
    })

    it('affiche le bouton téléphone', () => {
        cy.contains('04 67 20 04 44').should('be.visible')
    })

    it('affiche la section statistiques', () => {
        cy.contains('15+').should('be.visible')
        cy.contains('Années d\'expérience').should('be.visible')
        cy.contains('450+').should('be.visible')
        cy.contains('Clients satisfaits').should('be.visible')
    })

    it('affiche la section à propos', () => {
        cy.contains('Notre Expertise').should('be.visible')
        cy.contains('CLIMACONTROL').should('be.visible')
    })

    it('affiche la section CTA finale', () => {
        cy.contains('Prêt à améliorer votre confort').should('be.visible')
        cy.contains('Demander un devis').should('be.visible')
        cy.contains('Nous contacter').should('be.visible')
    })

    it('le bouton "Demander un devis" redirige vers /devis', () => {
        cy.contains('Demander un devis').click()
        cy.url().should('include', '/devis')
    })

    it('le bouton "Nous contacter" redirige vers /contact', () => {
        cy.visit('/')
        cy.contains('Nous contacter').click()
        cy.url().should('include', '/contact')
    })
})
