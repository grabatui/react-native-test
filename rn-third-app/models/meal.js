class Meal {
    constructor(data) {
        this.id = data.id;
        this.categoriesIds = data.categoriesIds;
        this.title = data.title;
        this.affordability = data.affordability;
        this.complexity = data.complexity;
        this.imageUrl = data.imageUrl || '';
        this.duration = data.duration || 0;
        this.ingredients = data.ingredients || [];
        this.steps = data.steps || [];

        this.isGlutenFree = data.isGlutenFree || false;
        this.isVegan = data.isVegan || false;
        this.isVegetarian = data.isVegetarian || false;
        this.isLactoseFree = data.isLactoseFree || false;
    }
}

export default Meal;
