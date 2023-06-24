import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";


const routes: Route[] = [
  {path: '', component: ShoppingListComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {
}