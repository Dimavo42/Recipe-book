import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeService } from '../recipe.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[];
  subscription:Subscription;
  
  constructor(private recipeSer:RecipeService,
    private route:ActivatedRoute,
    private Router:Router ) { }

  ngOnInit(): void {
    this.recipes=this.recipeSer.getRecipes();
    this.subscription=this.recipeSer.recipesChanged.subscribe(
      (recipes:Recipe[])=>{this.recipes=recipes;}
    );
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
  NewRecipe()
  {
    this.Router.navigate(['new'],{relativeTo:this.route});
  }
  

}
