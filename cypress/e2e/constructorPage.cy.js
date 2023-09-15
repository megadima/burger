import user from '../fixtures/user.json';
import { API } from '../../src/utils/burger-api';

const home = 'http://localhost:3000'


//test isolation disabled to prevent localstorage and cookie cleaning
describe('check ConstructorPage', () => {
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  })

  describe('UI', () => {
    beforeEach(() => {
      cy.visit(home)
      cy.get("#scrollList").find('li').as('ingredients')
    })

    it('open, compare data and close ingredient modal', () => {
      let name;
      cy.get('@ingredients').each(element => {
        cy.get(element).within(() => {
          cy.get('[data-testid="ingredient-name"]')
            .then($p => {
              name = $p.text()
            })
        })
        cy.then(() => {
          cy.get(element).click()
          cy.get('#modal').contains(name)
          cy.get('#modal_close').click();
        })
      })
    })

    it("check drag'n'drop all items", () => {
      let name; //for check item contains in cart after d'n'd
      cy.get('@ingredients').each(element => {
        cy.get(element).within(() => {
          cy.get('[data-testid="ingredient-name"]')
            .then($p => {
              name = $p.text()
            })
        })
        cy.then(() => {
          cy.get(element).trigger('dragstart')
          cy.get('#constructor').trigger('drop')
          cy.get('#constructor').contains(name)
        })
      })
    })
  })

  describe('checkout', () => {
    it('relocate to login if user not auth', () => {
      cy.visit(home)
      cy.get('button').contains('Оформить заказ').click();

      cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/login')
      })
    })

    it('auth test user and set cookie', () => {
      cy.intercept('POST', API + '/auth/login').as('loginRequest')

      cy.visit(home + '/profile')
      cy.get("[type='email']").type(user.email)
      cy.get("[type='password']").type(user.password)
      cy.get('button').contains('Войти').click()
      cy.wait('@loginRequest')
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500)
      cy.getCookie('accessToken').should('exist')

    })

    it('open order modal with number if user auth', () => {
      cy.intercept('POST', API + '/orders').as('sendOrderRequest')
      cy.visit(home)
      cy.get('button').contains('Оформить заказ').click();
      cy.wait('@sendOrderRequest');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(500);
      cy.get('#modal').contains('Ваш заказ начали готовить')
      cy.get('#modal_close').click();
    })
  })

})
