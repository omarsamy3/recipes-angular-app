import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipesService } from "../recipes/recipes.service";
import { Recipe } from "../recipes/recipe.model";
import { exhaustMap, map, take, tap } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { AuthInterceptorService } from "../auth/auth-interceptor.service";



@Injectable({
  providedIn: 'root'
})
export class DataStorageService{
  constructor(
    private http: HttpClient,
     private recipeService: RecipesService,
     ){}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();

    this.http.put(
      'https://ng-recipes-app-a292e-default-rtdb.firebaseio.com/recipes.json',
      recipes
    )
    .subscribe(response => {
      console.log('store Data', response);
    })
  }

  fetchRecipes(){
      return this.http.get<Recipe[]>(
        'https://ng-recipes-app-a292e-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            })
          }),
          tap(recipes => {
            this.recipeService.setRecipes(recipes);
          })
        );

  }


}
