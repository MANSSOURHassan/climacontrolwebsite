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
afterEach(() => {
    // Nettoyage si nécessaire
})
