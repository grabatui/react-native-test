class Meal {
    constructor(data) {
        this.id = data.id;
        this.categoriesIds = data.categoriesIds;
        this.title = data.title;
        this.affordability = data.affordability;
        this.complexity = data.complexity;
        this.imageUrl = data.imageUrl || '';
        this.duration = data.duration || 0;
        this.ingridients = data.ingridients || [];
        this.steps = data.steps || [];

        this.isGlutenFree = data.isGlutenFree;
        this.isVegan = data.isVegan;
        this.isVegetarian = data.isVegetarian;
        this.isLactoseFree = data.isLactoseFree;
    }
}

export default Meal;
