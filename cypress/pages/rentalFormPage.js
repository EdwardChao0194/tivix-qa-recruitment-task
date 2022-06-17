class RentalFormPage {
  getTitle() {
    return cy.get(".card-title");
  }

  getText() {
    return cy.get(".card-text");
  }

  getH6() {
    return cy.get("h6");
  }

  getName() {
    return cy.get("[id=name]");
  }

  getLastName() {
    return cy.get("[id=last_name]");
  }

  getCardNumber() {
    return cy.get("[id=card_number]");
  }
  getEmail() {
    return cy.get("[id=email]");
  }

  // Not working for some reason
  getErrorMsg() {
    return cy.get(".alert-danger");
  }

  getSubmitBtn() {
    return cy.get(".btn-primary");
  }
}

export default RentalFormPage;
