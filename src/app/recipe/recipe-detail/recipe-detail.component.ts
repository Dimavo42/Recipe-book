import { Component, OnInit} from '@angular/core';
import { ActivatedRoute,Params,Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private RescipeSer:RecipeService,
    private Route:ActivatedRoute,
    private Router:Router) { }

  ngOnInit(): void {
    this.Route.params.subscribe(
      (parmas:Params)=>{
        this.id=+parmas['id'];
        this.recipe=this.RescipeSer.getRecipe(this.id);
      }
    );

  }
  OnshoppingList(){
    this.RescipeSer.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  NevgiteToEdit(){
    this.Router.navigate(['edit'],{relativeTo:this.Route});
  }
  deleteRecipe()
  {
    this.RescipeSer.deleteRecipe(this.id);
    this.Router.navigate(['/recipes']);
  }

}
