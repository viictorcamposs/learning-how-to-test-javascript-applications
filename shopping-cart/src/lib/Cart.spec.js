import { Cart } from './Cart'

describe('Cart', () => {
  let cart

  const product = {
    title: 'Adidas running shoes - men',
    price: 35388,
  }

  const product2 = {
    title: 'Adidas running shoes - women',
    price: 41872,
  }

  beforeEach(() => {
    cart = new Cart()
  })

  describe('getTotal()', () => {
    it('should return 0 when function getTotal is executed in a newly created instance', () => {
      expect(cart.getTotal().getAmount()).toEqual(0)
    })

    it('should multiply quantity and price and receive the total amount', () => {
      const item = {
        product,
        quantity: 2,
      }

      cart.add(item)

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should ensure no more than one product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product,
        quantity: 1,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: product2,
        quantity: 1,
      })

      cart.remove(product)

      expect(cart.getTotal().getAmount()).toEqual(41872)
    })
  })

  describe('checkout()', () => {
    it('should return an object with the total and the list of items when summary() is called', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: product2,
        quantity: 1,
      })

      expect(cart.summary()).toMatchSnapshot()
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0)
    })

    it('should return an object with the total and the list of items', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: product2,
        quantity: 1,
      })

      expect(cart.checkout()).toMatchInlineSnapshot(`
        Object {
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Adidas running shoes - men",
              },
              "quantity": 2,
            },
            Object {
              "product": Object {
                "price": 41872,
                "title": "Adidas running shoes - women",
              },
              "quantity": 1,
            },
          ],
          "total": 112648,
        }
      `)
    })

    it('should reset the cart when is called', () => {
      cart.add({
        product: product2,
        quantity: 1,
      })

      cart.checkout()

      expect(cart.items).toEqual([])
    })
  })
})
