/// <reference types="cypress" />

describe('Page Devis', () => {
    beforeEach(() => {
        cy.visit('/devis')
    })

    it('affiche le titre de la page', () => {
        cy.get('h1').should('be.visible')
        cy.contains(/devis|demande/i).should('be.visible')
    })

    it('affiche le formulaire de demande de devis', () => {
        cy.get('form').should('be.visible')
    })

    it('le formulaire contient les champs essentiels', () => {
        // Nom
        cy.get('input[name="nom"], input[placeholder*="nom" i], input[id*="nom" i]').should('exist')
        // Email
        cy.get('input[type="email"], input[name="email"]').should('exist')
        // Téléphone
        cy.get('input[type="tel"], input[name="telephone"], input[placeholder*="téléphone" i]').should('exist')
    })

    it('peut remplir le formulaire de devis', () => {
        cy.fixture('testData').then((data) => {
            // Remplir les champs
            cy.get('input[name="nom"], input[placeholder*="nom" i]').first().type(data.contactForm.nom)
            cy.get('input[type="email"]').first().type(data.contactForm.email)
            cy.get('input[type="tel"], input[name="telephone"]').first().type(data.contactForm.telephone)

            // Vérifier que les champs sont remplis
            cy.get('input[name="nom"], input[placeholder*="nom" i]').first().should('have.value', data.contactForm.nom)
        })
    })

    it('affiche une erreur si le formulaire est soumis vide', () => {
        cy.get('form button[type="submit"], form button').contains(/envoyer|demander|soumettre/i).click()

        // Vérifier qu'il y a une validation
        cy.get(':invalid, [class*="error"], [class*="Error"]').should('exist')
    })

    it('le lien depuis la page d\'accueil fonctionne', () => {
        cy.visit('/')
        cy.contains('Devis gratuit').click()
        cy.url().should('include', '/devis')
    })
})
