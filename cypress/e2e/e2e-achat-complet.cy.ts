/// <reference types="cypress" />

/**
 * Test E2E Achat Complet - Parcours client de A à Z avec captures d'écran
 * Simule un client réel qui:
 * 1. Navigue sur les produits
 * 2. Ajoute un produit au panier
 * 3. Va au panier
 * 4. Passe à la commande (checkout)
 * 5. Remplit les informations de livraison
 * 6. Choisit le mode de paiement
 * 7. Confirme la commande
 */
describe('Parcours Client - Achat Complet', () => {

    beforeEach(() => {
        // Vider le localStorage (panier) avant le test
        cy.clearLocalStorage()
    })

    it('Parcours d\'achat complet du produit au paiement avec captures d\'écran', () => {

        // ===== ÉTAPE 1: Page d'accueil =====
        cy.visit('/')
        cy.wait(1000)
        cy.screenshot('achat-01-page-accueil')

        // ===== ÉTAPE 2: Navigation vers les produits =====
        cy.contains('Nos produits').click({ force: true })
        cy.wait(2000) // Attendre le chargement des produits depuis l'API
        cy.screenshot('achat-02-page-produits')

        // Vérifier que les produits sont chargés
        cy.url().should('include', '/produits')

        // ===== ÉTAPE 3: Voir la liste des produits =====
        // Attendre que le spinner disparaisse
        cy.get('body').should('not.contain', 'animate-spin')
        cy.wait(1000)
        cy.screenshot('achat-03-liste-produits-chargee')

        // ===== ÉTAPE 4: Ajouter un produit au panier =====
        cy.contains('Ajouter au panier').first().click({ force: true })
        cy.wait(1000)
        cy.screenshot('achat-04-produit-ajoute-toast')

        // Vérifier le toast de confirmation
        cy.contains('Produit ajouté au panier', { timeout: 5000 }).should('be.visible')

        // ===== ÉTAPE 5: Aller au panier =====
        cy.visit('/panier')
        cy.wait(1000)
        cy.screenshot('achat-05-panier-avec-produit')

        // Vérifier que le produit est dans le panier
        cy.contains('€').should('be.visible')
        cy.contains('Récapitulatif').should('be.visible')

        // ===== ÉTAPE 6: Vue du récapitulatif panier =====
        cy.screenshot('achat-06-recapitulatif-panier')

        // ===== ÉTAPE 7: Cliquer sur Finaliser ma commande =====
        cy.contains('Finaliser ma commande').click({ force: true })
        cy.wait(1000)
        cy.screenshot('achat-07-page-checkout-etape1')

        // Vérifier qu'on est sur la page commande
        cy.url().should('include', '/commande')
        cy.contains('Finaliser ma commande').should('be.visible')

        // ===== ÉTAPE 8: Remplir les informations de livraison =====
        // Prénom
        cy.get('input#prenom').type('Marie')
        cy.screenshot('achat-08-saisie-prenom')

        // Nom
        cy.get('input#nom').type('Dupont')
        cy.screenshot('achat-09-saisie-nom')

        // Email
        cy.get('input#email').type('marie.dupont@email.fr')
        cy.screenshot('achat-10-saisie-email')

        // Téléphone
        cy.get('input#telephone').type('06 12 34 56 78')
        cy.screenshot('achat-11-saisie-telephone')

        // Adresse
        cy.get('input#adresse').type('45 Rue de la République')
        cy.screenshot('achat-12-saisie-adresse')

        // Code postal
        cy.get('input#code_postal').type('69001')
        cy.screenshot('achat-13-saisie-code-postal')

        // Ville
        cy.get('input#ville').type('Lyon')
        cy.screenshot('achat-14-saisie-ville')

        // ===== ÉTAPE 9: Vue complète du formulaire livraison =====
        cy.scrollTo('top')
        cy.wait(300)
        cy.screenshot('achat-15-formulaire-livraison-complet')

        // ===== ÉTAPE 10: Passer à l'étape paiement =====
        cy.contains('Continuer vers le paiement').click({ force: true })
        cy.wait(500)
        cy.screenshot('achat-16-page-checkout-etape2-paiement')

        // Vérifier qu'on est à l'étape 2
        cy.contains('Mode de paiement').should('be.visible')

        // ===== ÉTAPE 11: Voir les options de paiement =====
        cy.contains('Carte bancaire').should('be.visible')
        cy.contains('PayPal').should('be.visible')
        cy.contains('Virement bancaire').should('be.visible')
        cy.contains('Chèque').should('be.visible')
        cy.screenshot('achat-17-options-paiement')

        // ===== ÉTAPE 12: Sélectionner PayPal =====
        cy.get('#paypal').click({ force: true })
        cy.wait(300)
        cy.screenshot('achat-18-selection-paypal')

        // ===== ÉTAPE 13: Sélectionner Carte bancaire =====
        cy.get('#carte').click({ force: true })
        cy.wait(300)
        cy.screenshot('achat-19-selection-carte-bancaire')

        // ===== ÉTAPE 14: Voir le message de sécurité =====
        cy.contains('Paiement sécurisé').should('be.visible')
        cy.screenshot('achat-20-message-securite')

        // ===== ÉTAPE 15: Voir le récapitulatif final =====
        cy.contains('Récapitulatif').should('be.visible')
        cy.contains('Total TTC').should('be.visible')
        cy.screenshot('achat-21-recapitulatif-final')

        // ===== ÉTAPE 16: Bouton Payer =====
        cy.contains(/Payer.*€/i).should('be.visible')
        cy.screenshot('achat-22-bouton-payer-final')

        // ===== ÉTAPE 17: Vue finale avant paiement =====
        cy.scrollTo('top')
        cy.wait(300)
        cy.screenshot('achat-23-vue-finale-avant-paiement')

        // Note: On ne clique pas sur "Payer" pour éviter l'appel réel à l'API
        // Dans un vrai test, on intercepeterait l'appel API avec cy.intercept()

        // cy.contains(/Payer.*€/i).click({ force: true })
        // cy.wait(3000)
        // cy.screenshot('achat-24-confirmation-commande')
    })

    it('Peut modifier la quantité dans le panier', () => {
        // Ajouter un produit
        cy.visit('/produits')
        cy.wait(2000)
        cy.contains('Ajouter au panier').first().click({ force: true })
        cy.wait(1000)

        // Aller au panier
        cy.visit('/panier')
        cy.wait(1000)
        cy.screenshot('panier-01-quantite-initiale')

        // Augmenter la quantité
        cy.get('button').contains('+').first().click({ force: true })
        cy.wait(500)
        cy.screenshot('panier-02-quantite-augmentee')

        // Vérifier que la quantité a changé
        cy.contains('2').should('be.visible')
    })

    it('Peut supprimer un produit du panier', () => {
        // Ajouter un produit
        cy.visit('/produits')
        cy.wait(2000)
        cy.contains('Ajouter au panier').first().click({ force: true })
        cy.wait(1000)

        // Aller au panier
        cy.visit('/panier')
        cy.wait(1000)
        cy.screenshot('panier-suppression-01-avant')

        // Supprimer le produit (bouton avec icône Trash)
        cy.get('button.text-destructive').first().click({ force: true })
        cy.wait(500)
        cy.screenshot('panier-suppression-02-apres')

        // Vérifier que le panier est vide
        cy.contains('Votre panier est vide').should('be.visible')
    })
})
