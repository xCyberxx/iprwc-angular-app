import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { ItemCardComponent } from './home/item-card/item-card.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminItemCardComponent } from './admin/admin-item-card/admin-item-card.component';
import { EditItemComponent } from './admin/edit-item/edit-item.component';
import { AddItemComponent } from './admin/add-item/add-item.component';
import { FormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

const appRoutes : Routes = [
  {path: '', component: HomeComponent },
  {path: 'admin', component: AdminComponent },
  {path: 'admin/edit/:id', component: EditItemComponent },
  {path: 'admin/add', component: AddItemComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    ItemCardComponent,
    NavigationBarComponent,
    AdminComponent,
    AdminItemCardComponent,
    EditItemComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
