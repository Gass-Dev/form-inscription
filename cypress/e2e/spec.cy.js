/* eslint-disable no-undef */
describe("template spec", () => {
  it("deployed react app to localhost", () => {
    cy.intercept("GET", "https://register-base-backend.vercel.app", {
      statusCode: 200,
      body: {
        utilisateurs: [
          {
            id: "1",
            name: "a",
            email: "a@mail.com",
          },
          {
            id: "2",
            name: "b",
            email: "b@mail.com",
          },
        ],
      },
    });

    // Visit the local React app
    cy.visit("http://localhost:3000");

    // Assert that the correct text is displayed
    cy.contains("2 user(s) already registered");
  });
});
