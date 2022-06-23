import { find, remove } from 'lodash'
import Dinero from 'dinero.js'

const Money = Dinero

Money.defaultCurrency = 'BRL'
Money.defaultPrecision = 2
export class Cart {
  items = []

  add(item) {
    const itemToFind = { product: item.product }

    if (find(this.items, itemToFind)) {
      remove(this.items, itemToFind)
    }

    this.items.push(item)
  }

  remove(product) {
    remove(this.items, { product })
  }

  getTotal() {
    return this.items.reduce(
      (accumulator, { quantity, product: { price } }) =>
        accumulator.add(Money({ amount: price })).multiply(quantity),
      Money({ amount: 0 }),
    )
  }

  summary() {
    return {
      items: this.items,
      total: this.getTotal().getAmount(),
    }
  }

  checkout() {
    const { items, total } = this.summary()

    this.items = []

    return {
      items,
      total,
    }
  }
}
