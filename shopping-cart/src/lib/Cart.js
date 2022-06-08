import { find, remove } from 'lodash'

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
    return !this.items.length < 1
      ? this.items.reduce(
          (accumulator, { quantity, product: { price } }) =>
            accumulator + quantity * price,
          0,
        )
      : 0
  }

  summary() {
    return {
      items: this.items,
      total: this.getTotal(),
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
