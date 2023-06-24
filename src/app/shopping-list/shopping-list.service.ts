import { Subject } from 'rxjs';

import {Ingredient} from '../shared/ingredient.model';

export class ShoppingListService{
    startEditing = new Subject<number>();
    ingredientsChanged = new Subject<Ingredient[]>();



    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatos', 10),
      ];

      getIngredients(){
        return this.ingredients;
      }

      getIngredient(index: number){
        return this.ingredients[index];
      }

      addIngredients(ingredients: Ingredient[]){
        ingredients.forEach(ing => {
          this.ingredients.push(ing)
        });
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

      updateIngredient(index: number, ingredient: Ingredient){
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }


      deleteItem(index: number){
          this.ingredients.splice(index, 1);
          this.ingredientsChanged.next(this.ingredients.slice());
      }

      clearIngsArray(){
        this.ingredients.splice(0, this.ingredients.length);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
}
