/// <reference types="cypress" />

describe('Page Rendez-vous', () => {
    beforeEach(() => {
        cy.visit('/rendez-vous')
    })

    it('affiche le titre de la page', () => {
        cy.get('h1').should('contain', 'Prendre Rendez-vous')
    })

    it('affiche le calendrier de sélection de date', () => {
        cy.contains('Choisir une date').should('be.visible')
        // Vérifier que le calendrier est présent
        cy.get('[role="grid"], .rdp, table').should('be.visible')
    })

    it('affiche le formulaire de détails', () => {
        cy.contains('Détails de l\'intervention').should('be.visible')
        cy.contains('Type de service').should('be.visible')
        cy.contains('Créneau horaire').should('be.visible')
    })

    it('affiche les champs de contact', () => {
        cy.contains('Vos coordonnées').should('be.visible')
        cy.get('input#name').should('be.visible')
        cy.get('input#phone').should('be.visible')
        cy.get('input#address').should('be.visible')
    })

    it('peut sélectionner un type de service', () => {
        // Ouvrir le sélecteur de type de service
        cy.contains('Sélectionner...').click({ force: true })
        // Vérifier que les options sont visibles
        cy.contains('Devis à domicile').should('be.visible')
        cy.contains('Installation').should('be.visible')
        cy.contains('Entretien').should('be.visible')
        cy.contains('Dépannage').should('be.visible')
        // Sélectionner une option
        cy.contains('Installation').click({ force: true })
    })

    it('peut sélectionner un créneau horaire', () => {
        // Ouvrir le sélecteur de créneau
        cy.contains('Préférence...').click({ force: true })
        cy.contains('Matin (8h - 12h)').should('be.visible')
        cy.contains('Après-midi (13h - 17h)').should('be.visible')
        cy.contains('Matin (8h - 12h)').click({ force: true })
    })

    it('peut remplir le formulaire de contact', () => {
        cy.get('input#name').type('Jean Dupont')
        cy.get('input#phone').type('0612345678')
        cy.get('input#address').type('123 Rue de Paris, 75001 Paris')
        cy.get('textarea#notes').type('Interphone code 1234')

        // Vérifier que les valeurs sont saisies
        cy.get('input#name').should('have.value', 'Jean Dupont')
        cy.get('input#phone').should('have.value', '0612345678')
    })

    it('affiche le bouton de confirmation', () => {
        cy.contains(/Confirmer le rendez-vous/i).should('be.visible')
    })
})
