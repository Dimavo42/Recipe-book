import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService{

    recipesChanged=new Subject<Recipe[]>();
    private recipes: Recipe[] =[
        new Recipe(
        'A Test Recipe'
        ,'Test is Test',
        'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/Puttanesca-fd5810c.jpg?resize=960,872?quality=90&webp=true&resize=600,545',
        [
            new Ingredient('meat',1),
            new Ingredient('Fries',20)
        ]),
        new Recipe('TestRecipe2'
        ,'Description',
        'https://images.wcdn.co.il/f_auto,q_auto,w_1000,t_54/2/9/6/6/2966098-46.jpg',
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat',1)
        ])
      ];
    constructor(private ShoppingListSer:ShoppingListService){}

    getRecipes(){
        return this.recipes.slice();
    }
    addIngredientsToShoppingList(Ingredients:Ingredient[])
    {
        this.ShoppingListSer.addIngredients(Ingredients);
    }
    getRecipe(IndexOfArray:number)
    {
        return this.recipes[IndexOfArray];
    }
    addRecipe(recipe:Recipe)
    {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(IndexOfArray:number,newrRcipe:Recipe)
    {
        this.recipes[IndexOfArray]=newrRcipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(IndexOfArray:number)
    {
        this.recipes.splice(IndexOfArray,1);
        this.recipesChanged.next(this.recipes.slice());
    }

}