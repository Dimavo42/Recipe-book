
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService{
    IngredientsChanged=new Subject<Ingredient[]>();
    StartedEditing= new Subject<number>();
    UpdateIngrdient:Ingredient;
    private ingredients:Ingredient[]=[
        new Ingredient('Appples',5),
        new Ingredient('Tometoes',1)
      ];
    getIngredients(){
        return this.ingredients.slice();
    }
    getIngredient(IndexOfArray:number)
    {
        return this.ingredients[IndexOfArray];
    }
    AddIngrdient(ingredient:Ingredient)
    {
        this.ingredients.push(ingredient);
        this.IngredientsChanged.next(this.ingredients.slice());
    }
    addIngredients(Ingredients:Ingredient[])
    {
        this.ingredients.push(...Ingredients);
        this.IngredientsChanged.next(this.ingredients.slice());
    }
    UpdateIngredient(IndexOfArray:number,newIngrident:Ingredient)
    {
        this.ingredients[IndexOfArray]=newIngrident;
        this.IngredientsChanged.next(this.ingredients.slice());
    }
    DeleteIngredient(IndexOfArray:number)
    {
        this.ingredients.splice(IndexOfArray,1);
        this.IngredientsChanged.next(this.ingredients.slice());
    }

}