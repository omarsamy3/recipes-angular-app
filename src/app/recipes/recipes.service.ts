import { Injectable} from '@angular/core';
import {Subject} from 'rxjs';


import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipesService{
  // recipes: Recipe[] = [
  //   new Recipe(
  //     'Burger',
  //     'This is simple burger to test.',
  //     `https://i.imgur.com/qP2KPMA.jpeg`,
  //     [
  //       new Ingredient('meat', 5),
  //       new Ingredient('bread', 6)
  //     ]
  //   ),
  //   new Recipe(
  //     'Pizza',
  //     'This is simple pizza to test',
  //     `https://i.imgur.com/UJq83Du.jpeg`,
  //     [
  //       new Ingredient('tomato', 3),
  //       new Ingredient('flour', 1)
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  recipesChanged = new Subject<Recipe[]>();

  constructor(
    private slService: ShoppingListService,
    ){}

  getRecipes(){
      return this.recipes.slice(); //to return a copy.
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
