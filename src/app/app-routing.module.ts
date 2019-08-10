import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCardComponent } from './user-card/user-card.component';


const routes: Routes = [
  {path: "user/:id", component: UserCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
