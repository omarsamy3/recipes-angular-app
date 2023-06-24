import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListRoutingModule } from "./shopping-list-routing.module";


@NgModule({
    declarations: [
      ShoppingListComponent,
      ShoppingListEditComponent,
    ],

    imports: [
      FormsModule,
      ShoppingListRoutingModule,
      SharedModule,
    ],
})
export class ShoppingListModule {
}