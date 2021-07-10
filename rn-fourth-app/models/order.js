import moment from 'moment';


export class Order {
    constructor(cartItems, totalAmount, date) {
        this.id = null;
        this.cartItems = cartItems;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get dateForHumans() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}
