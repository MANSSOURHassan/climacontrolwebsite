/// <reference types="cypress" />

describe('Page Contact', () => {
    beforeEach(() => {
        cy.visit('/contact')
    })

    it('affiche le titre de la page', () => {
        cy.get('h1').should('be.visible')
        cy.get('h1').should('contain.text', 'Contact')
    })

    it('affiche le formulaire de contact', () => {
        cy.get('form').should('be.visible')
    })

    it('affiche les informations de contact', () => {
        // Numéro de téléphone
        cy.contains('04 67 20 04 44').should('be.visible')
    })

    it('le formulaire contient les champs requis', () => {
        // Vérifier les champs du formulaire
        cy.get('input[name="nom"], input[placeholder*="nom" i]').should('be.visible')
        cy.get('input[name="email"], input[type="email"]').should('be.visible')
        cy.get('textarea, input[name="message"]').should('be.visible')
    })

    it('affiche une erreur si le formulaire est soumis vide', () => {
        cy.get('form button[type="submit"], form button').contains(/envoyer|soumettre|contacter/i).click()

        // Vérifier qu'il y a une validation (message d'erreur ou champ invalide)
        cy.get(':invalid, [class*="error"], [class*="Error"]').should('exist')
    })

    it('peut remplir le formulaire de contact', () => {
        cy.fixture('testData').then((data) => {
            cy.get('input[name="nom"], input[placeholder*="nom" i]').first().type(data.contactForm.nom)
            cy.get('input[name="email"], input[type="email"]').first().type(data.contactForm.email)
            cy.get('textarea').first().type(data.contactForm.message)
        })
    })
})
