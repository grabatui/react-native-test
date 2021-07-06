export class Order {
    constructor(cartItems, totalAmount, date) {
        this.id = null;
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
        this.date = date;
    }
}
