/// <reference types="cypress" />

describe('Espace Pro', () => {
    beforeEach(() => {
        cy.visit('/pro')
    })

    it('affiche le titre de la page', () => {
        cy.get('h1').should('contain', 'Espace dédié aux Professionnels')
    })

    it('affiche le badge Espace Pro', () => {
        cy.contains('Espace Pro').should('be.visible')
    })

    it('affiche la description des avantages', () => {
        cy.contains('Installeurs, architectes, revendeurs').should('be.visible')
        cy.contains('tarifs préférentiels').should('be.visible')
    })

    it('affiche la section des avantages', () => {
        cy.contains('Pourquoi devenir partenaire').should('be.visible')
    })

    it('affiche les 4 avantages principaux', () => {
        cy.contains('Tarifs Préférentiels').should('be.visible')
        cy.contains('Support Prioritaire').should('be.visible')
        cy.contains('Paiement Différé').should('be.visible')
        cy.contains('Outils Exclusifs').should('be.visible')
    })

    it('affiche le détail des avantages', () => {
        cy.contains('-30%').should('be.visible')
        cy.contains('Ligne directe').should('be.visible')
        cy.contains('30 jours').should('be.visible')
    })

    it('affiche le formulaire d\'inscription', () => {
        cy.contains('Créer un compte PRO gratuit').should('be.visible')
        cy.contains('Accès immédiat après validation du SIRET').should('be.visible')
    })

    it('affiche tous les champs du formulaire', () => {
        cy.contains('Prénom').should('be.visible')
        cy.contains('Nom').should('be.visible')
        cy.contains('Société / Raison Sociale').should('be.visible')
        cy.contains('Numéro SIRET').should('be.visible')
        cy.contains('Email Professionnel').should('be.visible')
        cy.contains('Mot de passe').should('be.visible')
    })

    it('peut remplir le formulaire d\'inscription', () => {
        // Remplir tous les champs
        cy.get('input').eq(0).type('Jean')  // Prénom
        cy.get('input').eq(1).type('Dupont')  // Nom
        cy.get('input').eq(2).type('ClimaServices SARL')  // Société
        cy.get('input').eq(3).type('123456789 00012')  // SIRET
        cy.get('input').eq(4).type('jean.dupont@climaservices.fr')  // Email
        cy.get('input').eq(5).type('MonMotDePasse123!')  // Password

        // Vérifier que les valeurs sont saisies
        cy.get('input').eq(0).should('have.value', 'Jean')
        cy.get('input').eq(4).should('have.value', 'jean.dupont@climaservices.fr')
    })

    it('affiche le bouton d\'inscription', () => {
        cy.contains(/S'inscrire comme PRO/i).should('be.visible')
    })

    it('affiche le lien vers les CGV Pro', () => {
        cy.contains('CGV Pro').should('be.visible')
    })
})
