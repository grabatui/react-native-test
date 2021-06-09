export default class Product {
    constructor(id, ownerId, title, imageUrl, description, price) {
        this.id = id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    static make(data) {
        return new Product(
            data.id || null,
            data.ownerId || null,
            data.title || '',
            data.imageUrl || '',
            data.description || '',
            data.price || 0.0
        );
    }
}
