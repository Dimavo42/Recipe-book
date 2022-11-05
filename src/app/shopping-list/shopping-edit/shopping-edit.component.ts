import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  constructor(private ShoppingListSer:ShoppingListService) { }
  CurrentSubscription:Subscription;
  EditMode=false;
  IndexOfArrayEdit:number;
  EditIngrident:Ingredient;
  @ViewChild('InputForm') InputForm:NgForm;
  ngOnInit(): void {
    this.CurrentSubscription=this.ShoppingListSer.StartedEditing.subscribe(
      (IndexOfArray:number)=>{
        this.EditMode=true;
        this.IndexOfArrayEdit=IndexOfArray;
        this.EditIngrident = this.ShoppingListSer.getIngredient(IndexOfArray);
        this.InputForm.setValue({
          name:this.EditIngrident.name,
          amount:this.EditIngrident.amount
        });
      }
    );
  }
  ngOnDestroy(): void {
    this.CurrentSubscription.unsubscribe();
  }



  AddIngrdient(InputForm:NgForm)
  {
    

    const newIngdient=new Ingredient(InputForm.value.name,InputForm.value.amount);
    if(this.EditMode)
    {
      this.ShoppingListSer.UpdateIngredient(this.IndexOfArrayEdit,newIngdient);
    }
    else
    {
      this.ShoppingListSer.AddIngrdient(newIngdient);
    }
    this.EditMode=false;
    InputForm.reset();
    
  }
  ClearForm()
  {
    this.EditMode=false;
    this.InputForm.reset();
  }
  DeleteItem()
  {
    this.ClearForm();
    this.ShoppingListSer.DeleteIngredient(this.IndexOfArrayEdit);

  }

}
