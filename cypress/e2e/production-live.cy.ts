/// <reference types="cypress" />

describe('Production Site Live Test', () => {
    const prodUrl = 'https://clima-control-e-commerce-website.vercel.app/';

    beforeEach(() => {
        cy.visit(prodUrl);
    });

    it('should load the homepage and check key elements', () => {
        // Check if the page title contains "ClimaControl" or relevant text
        cy.title().should('not.be.empty');

        // Verify the H1 exists and has content
        cy.get('h1').should('be.visible');

        // Verify the main navigation exists
        cy.get('nav').should('be.visible');

        // Verify footer exists
        cy.get('footer').should('be.visible');
    });

    it('should navigate through main pages on production', () => {
        // Test navigation to Products
        // Using a more specific selector to avoid mobile menu ambiguity
        cy.get('nav.hidden.md\\:flex').contains('Produits').click({ force: true });
        cy.url().should('include', '/produits');
        cy.get('h1').should('be.visible');

        // Test navigation to About
        cy.get('nav.hidden.md\\:flex').contains('À Propos').click({ force: true });
        cy.url().should('include', '/a-propos');
        cy.get('h1').should('be.visible');

        // Test navigation to Contact
        cy.get('nav.hidden.md\\:flex').contains('Contact').click({ force: true });
        cy.url().should('include', '/contact');
        cy.get('h1').should('be.visible');
    });

    it('should have working "Devis" button', () => {
        cy.contains('Devis gratuit').should('be.visible');
        cy.contains('Devis gratuit').click({ force: true });
        cy.url().should('include', '/devis');
    });
});
