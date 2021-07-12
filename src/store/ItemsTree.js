class Parent {
  items = [];

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }

  // Setters & Getters
  get done() {
    return Math.round(this.total_progress / this.total_items);
  }

  get cost() {
    return this.total_cost;
  }

  // calcaulated proprties
  get total_items() {
    return this.items.length;
  }

  get total_done() {
    return this.items.filter((item) => item.done == 100).length;
  }

  get total_cost() {
    return this.items.reduce((prev, cur) => prev + cur.cost, 0);
  }

  get total_progress() {
    return this.items.reduce((prev, cur) => prev + cur.done, 0);
  }

  get total_spent() {
    if (this.total_items)
      return this.items.reduce((prev, cur) => prev + cur.total_spent, 0);
    else return this.done == 100 ? this.cost : 0;
  }

  get remaining() {
    return this.total_cost - this.total_spent;
  }

  // Methods
  addItem(item) {
    this.items.push(item);
  }
  getItem(id) {
    return this.items.find((item) => item.id == id);
  }
  removeItem(id) {
    const itemIndex = this.items.findIndex((item) => item.id == id);
    this.items.splice(itemIndex, 1);
  }
}

class Item {
  items = [];

  constructor(id, name, { cost, done, priority, due_date }) {
    this.id = id;
    this.name = name;

    // wishlist
    this.due_date = due_date;

    // wishlist & item
    this.priority = priority;

    // item & subitem
    this.cost = cost;
    this.done = done;
  }

  // Setters & Getters
  // item's done status or item's progress based on total childs done / length
  set done(val) {
    this._done = !isNaN(val) && val >= 0 && val <= 100 ? val : 0;
  }

  get done() {
    return this.total_items > 0
      ? Math.round(this.total_progress / this.total_items)
      : this._done;
  }

  // item's cost or item's total childs costs
  set cost(val) {
    this._cost = !isNaN(val) && val >= 0 ? val : 0;
  }

  get cost() {
    return this.total_items > 0 ? this.total_cost : this._cost;
  }

  // Stringfy
  get getCostString() {
    return this.cost + " SAR";
  }

  get getProgressString() {
    return `${this.total_done} of ${this.total_items}`;
  }

  // calcaulated proprties
  get total_items() {
    return this.items.length;
  }

  get total_done() {
    return this.items.filter((item) => item.done == 100).length;
  }

  get total_cost() {
    return this.items.reduce((prev, cur) => prev + cur.cost, 0);
  }

  get total_progress() {
    return this.items.reduce((prev, cur) => prev + cur.done, 0);
  }

  get total_spent() {
    if (this.total_items)
      return this.items.reduce((prev, cur) => prev + cur.total_spent, 0);
    else return this.done == 100 ? this.cost : 0;
  }

  get remaining() {
    return this.total_cost - this.total_spent;
  }

  // Methods
  addItem(item) {
    this.items.push(item);
  }
  getItem(id) {
    return this.items.find((item) => item.id == id);
  }
  updateItem(id, data) {
    const item = this.items.find((item) => item.id == id);
    item.name = data.name ? data.name : item.name;
    item.cost = data.cost ? data.cost : item.cost;
    item.done = data.done ? data.done : item.done;
  }
  removeItem(id) {
    const itemIndex = this.items.findIndex((item) => item.id == id);
    this.items.splice(itemIndex, 1);
  }
}
