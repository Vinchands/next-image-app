describe('About page', () => {
  it('should load the about page and display About Us heading', () => {
    cy.visit('/about')
    
    cy.get('h1').should('contain.text', 'About Us')
  })
})