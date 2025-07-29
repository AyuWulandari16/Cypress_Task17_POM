import LoginPage from '../support/pages/LoginPage';

describe("OrangeHRM Login Feature (POM without intercept)", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("Login with valid credentials", () => {
    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('admin123');
    LoginPage.submit();
    LoginPage.verifyDashboardVisible();
  });

  it("Login with invalid password", () => {
    LoginPage.fillUsername('Admin');
    LoginPage.fillPassword('wrongpassword');
    LoginPage.submit();
    LoginPage.getErrorMessage().should('be.visible');
  });

  it("Login with empty username", () => {
    LoginPage.fillPassword('admin123');
    LoginPage.submit();
    LoginPage.getRequiredMessage().should('be.visible');
  });

  it("Login with empty password", () => {
    LoginPage.fillUsername('Admin');
    LoginPage.submit();
    LoginPage.getRequiredMessage().should('be.visible');
  });

  it("Login with both fields empty", () => {
    LoginPage.submit();
    cy.get('span:contains("Required")').should('have.length', 2);
  });

  it("Login with whitespace only in both fields", () => {
    LoginPage.fillUsername('   ');
    LoginPage.fillPassword('   ');
    LoginPage.submit();
    LoginPage.getRequiredMessage().should('be.visible');
  });

  it("Login with SQL injection attempt", () => {
    LoginPage.fillUsername("' OR 1=1 --");
    LoginPage.fillPassword("anything");
    LoginPage.submit();
    LoginPage.getErrorMessage().should('be.visible');
  });

  it("Login with XSS payload in username", () => {
    LoginPage.fillUsername("<script>alert(1)</script>");
    LoginPage.fillPassword("anything");
    LoginPage.submit();
    LoginPage.getErrorMessage().should('be.visible');
  });

  it("Login with uppercase username", () => {
    LoginPage.fillUsername("ADMIN");
    LoginPage.fillPassword("admin123");
    LoginPage.submit();
    LoginPage.verifyDashboardVisible();
  });

  it("Login with long string input", () => {
    const longText = 'a'.repeat(120);
    LoginPage.fillUsername(longText);
    LoginPage.fillPassword(longText);
    LoginPage.submit();
    LoginPage.getErrorMessage().should('be.visible');
  });

  it("Login using Enter key", () => {
    LoginPage.fillUsername('Admin');
    cy.get('input[name="password"]').type('admin123{enter}');
    LoginPage.verifyDashboardVisible();
  });

  afterEach(() => {
  cy.screenshot();
});

});
