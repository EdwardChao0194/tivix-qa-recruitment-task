/// <reference types="Cypress" />

import RentalFormPage from "../../pages/rentalFormPAge";
import RentInfoPage from "../../pages/rentInfoPage";
import SearchPage from "../../pages/searchPage";
import testData from "../../fixtures/testData.json";

describe("creating E2E testing around tivix webpage", () => {
  beforeEach(() => {
    cy.visit("http://qalab.pl.tivixlabs.com/");
  });

  it("allows the user to fill out the rental form", () => {
    //happy path
    const searchPage = new SearchPage();
    searchPage.getCountry().select(testData.searchPage.countryName[0]);
    searchPage.getCity().select(testData.searchPage.cityName[2]);
    searchPage.getModel().type(testData.searchPage.modelName[0]);
    searchPage.getPickupTime().type(testData.searchPage.pickUpTime);
    searchPage.getDropOffTime().type(testData.searchPage.dropOffTime);
    searchPage.getSubmitBtn().click();
    searchPage.getToyotaAygoResult().should("be.visible");
    searchPage.getToyotaAygoResult().click();

    const rentInfoPage = new RentInfoPage();
    rentInfoPage
      .getHeader()
      .should("include.text", testData.searchPage.modelName[0]);
    rentInfoPage
      .getTitle()
      .should("include.text", testData.rentInfoPage.companyName);
    rentInfoPage
      .getText()
      .should("include.text", testData.rentInfoPage.pricePerDay);
    rentInfoPage
      .getText()
      .should(
        "include.text",
        `Location: ${testData.searchPage.countryName[0]}, ${testData.searchPage.cityName[2]}`
      );
    rentInfoPage
      .getText()
      .should("include.text", testData.rentInfoPage.licensePlate);
    rentInfoPage
      .getH6()
      .should("include.text", `Pickup date: ${testData.searchPage.pickUpTime}`);
    rentInfoPage
      .getH6()
      .should(
        "include.text",
        `Dropoff date: ${testData.searchPage.dropOffTime}`
      );
    rentInfoPage.getRentBtn().should("be.visible");
    rentInfoPage.getRentBtn().click();

    const rentalFormPage = new RentalFormPage();
    rentalFormPage
      .getTitle()
      .should("include.text", testData.rentInfoPage.companyName);
    rentalFormPage
      .getText()
      .should("include.text", testData.rentInfoPage.pricePerDay);
    rentalFormPage
      .getText()
      .should(
        "include.text",
        `Location: ${testData.searchPage.countryName[0]}, ${testData.searchPage.cityName[2]}`
      );
    rentalFormPage
      .getText()
      .should("include.text", testData.rentInfoPage.licensePlate);
    rentalFormPage
      .getH6()
      .should("include.text", `Pickup date: ${testData.searchPage.pickUpTime}`);
    rentalFormPage
      .getH6()
      .should(
        "include.text",
        `Dropoff date: ${testData.searchPage.dropOffTime}`
      );

    rentalFormPage.getName().type(testData.userInfo.firstName);
    rentalFormPage.getLastName().type(testData.userInfo.lastName);
    rentalFormPage.getCardNumber().type(testData.userInfo.cardNumber);
    rentalFormPage.getEmail().type(testData.userInfo.email);
  });

  it("allows the user to filter out Models", () => {
    //This test should fail due to the filters not working
    const searchPage = new SearchPage();
    searchPage.getCountry().select(testData.searchPage.countryName[0]);
    searchPage.getCity().select(testData.searchPage.cityName[2]);
    searchPage.getModel().type(testData.searchPage.modelName[3]);
    searchPage.getPickupTime().type(testData.searchPage.pickUpTime);
    searchPage.getDropOffTime().type(testData.searchPage.dropOffTime);
    searchPage.getSubmitBtn().click();

    searchPage.getModelList().each((item) => {
      cy.wrap(item).should("include.text", testData.searchPage.modelName[3]);
    });
  });

  it("checks that the rental form is filled out correctly", () => {
    const searchPage = new SearchPage();
    searchPage.getCountry().select(testData.searchPage.countryName[0]);
    searchPage.getCity().select(testData.searchPage.cityName[2]);
    searchPage.getModel().type(testData.searchPage.modelName[0]);
    searchPage.getPickupTime().type(testData.searchPage.pickUpTime);
    searchPage.getDropOffTime().type(testData.searchPage.dropOffTime);
    searchPage.getSubmitBtn().click();
    searchPage.getToyotaAygoResult().click();

    const rentInfoPage = new RentInfoPage();
    rentInfoPage.getRentBtn().click();

    const rentalFormPage = new RentalFormPage();
    rentalFormPage.getSubmitBtn().click();
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.missingUserInfoErr.missingFirstNameErr);
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.missingUserInfoErr.missingLastNameErr);
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.missingUserInfoErr.missingEmailErr);
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.missingUserInfoErr.missingCardErr);

    //Verifying correct error statement for exceeding input length
    rentalFormPage.getName().type(testData.longUserInfo.longFirstName);
    rentalFormPage.getLastName().type(testData.longUserInfo.longLastName);
    rentalFormPage.getCardNumber().type(testData.longUserInfo.longCardNum);
    rentalFormPage.getEmail().type(testData.longUserInfo.longEmail);
    rentalFormPage.getSubmitBtn().click();
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.longUserInfoErr.longFirstNameErr);
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.longUserInfoErr.longLastNameErr);
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.longUserInfoErr.longCardNumErr);
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.longUserInfoErr.longEmailErr);

    //Verifying correct error statement for invalid input
    rentalFormPage.getCardNumber().type(testData.invalidUserInfo.invalidCard);
    rentalFormPage.getEmail().type(testData.invalidUserInfo.invalidEmail);
    rentalFormPage.getSubmitBtn().click();
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.invalidUserInfoErr.invalidCardErr);
    rentalFormPage
      .getErrorMsg()
      .should("include.text", testData.invalidUserInfoErr.invalidEmailErr);
  });
});
