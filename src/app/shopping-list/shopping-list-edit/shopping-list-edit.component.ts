import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css'],
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  editMode = false;
  editedItemIndex!: number;
  editedIngredient!: Ingredient;
  editingSubscription!: Subscription;

  @ViewChild('f', { static: false }) slForm!: NgForm;

  constructor(private slService: ShoppingListService){}

  ngOnInit(){
    //Edit Subscription
    this.editingSubscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedIngredient = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        })
      }
    )   
  }

  onSubmit(){
    const value = this.slForm.value
    const newIngredient = new Ingredient(value.name, value.amount);
    if(!this.editMode){
      this.slService.addIngredient(newIngredient);
    }
    else{ //Editing Mode
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear(){
        this.editMode = false;
        this.slForm.reset();
  }

  onDelete(){
    console.log(this.editedItemIndex)
    this.slService.deleteItem(this.editedItemIndex);
    this.onClear()
  }

  ngOnDestroy(){
    this.editingSubscription.unsubscribe();
  }
}
