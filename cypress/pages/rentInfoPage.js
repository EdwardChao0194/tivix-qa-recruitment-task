class RentInfoPage {
  getHeader() {
    return cy.get(".card-header");
  }

  getTitle() {
    return cy.get(".card-title");
  }

  getText() {
    return cy.get(".card-text");
  }

  getH6() {
    return cy.get("h6");
  }

  getRentBtn() {
    return cy.get('a[href*="/rent/51"]');
  }
}

export default RentInfoPage;
