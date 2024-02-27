describe('Listing Restaurants', () => {
  it('shows the restaurants from the server', () => {
    const pastaPlace = 'Pasta Place';
    const saladPlace = 'Salad Place';

    cy.intercept('GET', 'http://api.outsidein.dev/*/restaurants', [
      {id: 1, name: pastaPlace},
      {id: 2, name: saladPlace},
    ]);

    cy.visit('/');
    cy.contains(pastaPlace);
    cy.contains(saladPlace);
  });
});
