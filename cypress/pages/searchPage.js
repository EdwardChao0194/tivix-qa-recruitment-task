class SearchPage {
  getCountry() {
    return cy.get("[id=country]");
  }

  getCity() {
    return cy.get("[id=city]");
  }

  getModel() {
    return cy.get("[id=model]");
  }

  getPickupTime() {
    return cy.get("[id=pickup]");
  }

  getDropOffTime() {
    return cy.get("[id=dropoff]");
  }

  getSubmitBtn() {
    return cy.get(".btn-primary");
  }

  getToyotaAygoResult() {
    return cy.get('a[href*="/details/51"]');
  }

  getModelList() {
    return cy.get("tr td:nth-child(3)");
  }
}

export default SearchPage;
