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

    cy.get('[data-test-id="cypress-header-profileC"]').should('exist').should('be.visible');

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

describe('Test3 - Registro de Perfil de Mascota y Hospedaje Correcto', () => {
  it('passes', () => {
    // Inicio de Sesión
    cy.visit('/');
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // Ingreso de datos Correctos
    cy.get('@loginEmail').type('bejiro5828@anawalls.com');
    cy.get('@loginPassword').type('Password01');
    cy.wait(500);
    cy.get('@loginPassword').invoke('val').its("length").should('be.gt', 7);

    // Click en el botón de Iniciar Sesión
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(500);
    cy.visit('/user/profilePet');

    // Ingreso de datos Correctos
    cy.get('[data-test-id="cypress-input-petName"]').as('namePet');
    cy.get('#especie').as('speciesPet');
    cy.get('[data-test-id="cypress-input-breed"]').as('breedPet');
    cy.get('[data-test-id="cypress-input-age"]').as('agePet');
    cy.get('[data-test-id="cypress-input-vetContact"]').as('vetContactPet');
    cy.get('[data-test-id="cypress-input-behavior"]').as('behaviorPet');
    cy.get('[data-test-id="cypress-input-extraComments"]').as('extraCommentsPet');

    cy.get('@namePet').type('Cypress');
    cy.get('@speciesPet').type('Perro');
    cy.get('@breedPet').type('Schnauzer');
    cy.get('@agePet').type('2');
    cy.get('@vetContactPet').type('12345678');
    cy.get('@behaviorPet').type('Jugueton');
    cy.get('@extraCommentsPet').type('Debe tomar medicamento');

    // ver que los datos no esten vacios
    cy.get('@namePet').invoke('val').should('not.be.empty');
    cy.get('@speciesPet').should('not.be.empty');
    cy.get('@breedPet').invoke('val').should('not.be.empty');
    cy.get('@agePet').invoke('val').should('not.be.empty');
    cy.get('@vetContactPet').invoke('val').should('not.be.empty');
    cy.get('@behaviorPet').invoke('val').should('not.be.empty');
    cy.get('@extraCommentsPet').invoke('val').should('not.be.empty');


    cy.intercept('POST', '/pet/create').as('CreatePet');

    // chequear si son numeros
    cy.get('@agePet').invoke('val').should('match', /^\d+$/);
    cy.get('@vetContactPet').invoke('val').should('match', /^\d+$/);


    // chequear si el boton esta habilitado
    cy.get('[data-test-id="cypress-button-savePet"]').should('be.enabled');

    // Click en el botón de Registrar Mascota
    cy.get('[data-test-id="cypress-button-savePet"]').as('registerPetButton');
    cy.get('@registerPetButton').click();

    cy.wait('@CreatePet').then(({ response }) => {
      expect(response.headers['content-type'].includes('application/json')).to.be.true;
      expect(response.statusCode).to.eq(200);
    })
    cy.wait(500);
    cy.get('[data-test-id="title"]').should('exist').should('be.visible');

    cy.intercept('GET', '/pet/client/*').as('getPets');

    cy.visit('/user/mypets');
    cy.wait(500);
    cy.wait('@getPets').then(({ response }) => {
      expect(response.headers['content-type'].includes('application/json')).to.be.true;
      expect(response.statusCode).to.eq(200);
      const pets = response.body.data.length;
      console.log(pets, "mascotas");
      const index = pets - 1;

      cy.get('[data-test-id="btn-hospedar-' + index + '"]').as('hostPetButton');
      cy.get('@hostPetButton').should('be.enabled');
    })

    cy.get('@hostPetButton').click();
    cy.wait(300);

    cy.get('[data-test-id="input-fecha"]').as('hostingDate');

    cy.get('@hostingDate').type('2023-12-30');
    cy.get('@hostingDate').invoke('val').should('not.be.empty');
    cy.intercept('POST', '/pet/hospedar').as('hospedarPet');
    cy.get('[data-test-id="btn-hospedar-accept"]').as('hostPetButton');

    cy.get('@hostPetButton').click();
    cy.wait('@hospedarPet').then(({ response }) => {
      expect(response.headers['content-type'].includes('application/json')).to.be.true;
      expect(response.statusCode).to.eq(200);
    })

  })
}
)

describe('Test4 - Crear Review', () => {
  it('passes', () => {
    // Inicio de Sesión
    cy.visit('/');
    cy.get('[data-test-id="cypress-header-login"]').should('exist').should('be.visible');
    cy.get('[data-test-id="cypress-email-login"]').as('loginEmail');
    cy.get('[data-test-id="cypress-password-login"]').as('loginPassword');

    // Ingreso de datos Correctos
    cy.get('@loginEmail').type('bejiro5828@anawalls.com');
    cy.get('@loginPassword').type('Password01');
    cy.wait(500);
    cy.get('@loginPassword').invoke('val').its("length").should('be.gt', 7);

    // Click en el botón de Iniciar Sesión
    cy.get('[data-test-id="cypress-button-login"]').as('loginButton');
    cy.get('@loginButton').click();
    cy.wait(500);
    cy.visit('/user/resenia');

    cy.get('[data-test-id="cypress-review-comment"]').as('review');
    cy.get('#data-test-id').as('stars');
    cy.get('@stars').type('2');

    cy.get('@review').type('Cypress - Test - Reseña a crear con 3 estrellas');
    cy.get('@review').invoke('val').should('not.be.empty');

    cy.get('[data-test-id="cypress-review-submit"]').as('submitButton');
    cy.get('@submitButton').should('be.enabled');

    cy.intercept('POST', '/review/create').as('CreateReview');

    cy.get('@submitButton').click();

    cy.wait('@CreateReview').then(({ response }) => {
      expect(response.headers['content-type'].includes('application/json')).to.be.true;
      expect(response.statusCode).to.eq(200);
    })


  })
}
)

describe('Test5 - Devolver Mascota', () => {
  it('passes', () => {
    
  })
}
)

describe('Test6 - Crear Producto', () => {
  it('passes', () => {
    
  })
}
)
