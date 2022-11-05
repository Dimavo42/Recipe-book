import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
  ingredients:Ingredient[];

  private ChangesInArray:Subscription
  constructor(private ShoppingListSer:ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients=this.ShoppingListSer.getIngredients();
    this.ChangesInArray=this.ShoppingListSer.IngredientsChanged.subscribe(
      (IngredientsArray:Ingredient[])=>{
        this.ingredients=IngredientsArray;

      }
    );
  }
  ngOnDestroy(): void {
      this.ChangesInArray.unsubscribe();
  }
  EditItem(IndexOfArray:number)
  {
    this.ShoppingListSer.StartedEditing.next(IndexOfArray);
  }


}
