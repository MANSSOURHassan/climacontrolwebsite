// ***********************************************************
// E2E Support File
// ***********************************************************

// Import des commandes personnalisées
import './commands'

// Configuration globale avant chaque test
beforeEach(() => {
    // Ignorer les erreurs uncaught exceptions de l'app
    cy.on('uncaught:exception', (err, runnable) => {
        // Retourner false empêche Cypress d'échouer le test
        return false
    })
})

// Configuration globale après chaque test
afterEach(function () {
    // Si le test a échoué, on prend une capture d'écran
    // Cela fonctionne même en mode 'cypress open'
    if (this.currentTest?.state === 'failed') {
        const screenshotName = `${this.currentTest.parent?.title} -- ${this.currentTest.title} (failed)`
        cy.screenshot(screenshotName)
    }
})
