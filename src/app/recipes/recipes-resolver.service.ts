import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Observable } from "rxjs";
import { DataStorageService } from "../shared/data-storage.service";
import { RecipesService } from "./recipes.service";


@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipesService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Recipe[] | Observable<Recipe[]> | Promise<Recipe[]>
  {
    const recipes = this.recipeService.getRecipes();
    if(recipes.length === 0){
      return this.dataStorageService.fetchRecipes();
    }
    else{
      return recipes;
    }
  }

}
