import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id:number;
  editMode:boolean=false;
  recipeForm:FormGroup;
  constructor(private Route:ActivatedRoute,
    private recipeSer:RecipeService,
    private Router:Router) { }

  ngOnInit(): void {
    this.Route.params.subscribe(
      (params:Params)=>{
        this.id=+params['id'];
        this.editMode= params['id'] !=null;
        this.InitForm();
      }
    );
  }
  onSubmit(){
      if(this.editMode)
      {
        this.recipeSer.updateRecipe(this.id,this.recipeForm.value);
      }
      else
      {
        this.recipeSer.addRecipe(this.recipeForm.value);
      }
      this.onCancel();
  }
  get IngredintControls()
  {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onAddIngrdient()
  {
     (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])

      })
      ); 
  }
  onCancel()
  {
    this.Router.navigate(['/'],{relativeTo:this.Route});
  }
  deleteIngrdient(IndexOfArray:number){
      (<FormArray>this.recipeForm.get('ingredients')).removeAt(IndexOfArray);
  }


  private InitForm(){
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    let recipeIngredients=new FormArray([]);
    if(this.editMode)
    {
      const recipe=this.recipeSer.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDescription=recipe.description;
      if(recipe['ingredients'])
      {
        for( let ingrent of recipe.ingredients)
        {
          recipeIngredients.push(
            new FormGroup({
              'name':new FormControl(ingrent.name,Validators.required),
              'amount':new FormControl(ingrent.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)

              ])
            })
          );
        }
      }
    }
    this.recipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagePath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingredients':recipeIngredients
    });
  }

}