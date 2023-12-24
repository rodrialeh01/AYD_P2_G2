describe('Test1 - Login Correcto', () => {
  it('passes', () => {
    // Inicio de Sesión
    cy.visit('/');
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // Ingreso de datos Correctos
    cy.get('@loginEmail').type('paxelar971@arensus.com');
    cy.get('@loginPassword').type('Password01');
    cy.wait(500);
    cy.get('@loginPassword').invoke('val').its("length").should('be.gt', 7);

    // Click en el botón de Iniciar Sesión
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();

  })
})

describe('Test2 - Login Incorrecto', () => {
  it('passes', () => {
    // Inicio de Sesión
    cy.visit('/');
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // Ingreso de datos Incorrectos
    cy.get('@loginEmail').type('paxelar971@arensus.com');
    cy.get('@loginPassword').type('Password02');

    // obtener status de la respuesta
    cy.intercept('POST', '/auth/sign/in').as('login');

    // Click en el botón de Iniciar Sesión
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();

    cy.wait('@login').then(({ response }) => {
      expect(response.headers['content-type'].includes('application/json')).to.be.true;
      expect(response.statusCode).to.eq(400);
    })
  })
})
