import { defineConfig } from "cypress"

export default defineConfig({
  projectId: 'gsxhwv',
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    trashAssetsBeforeRuns: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 60000,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
})
