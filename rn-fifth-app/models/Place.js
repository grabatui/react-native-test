class Place {
    constructor(id, title, image, latitude = 0.0, longitude = 0.0) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.address = '';
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default Place;
