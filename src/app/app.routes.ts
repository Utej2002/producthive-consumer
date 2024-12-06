import { Routes } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
    {path:'products', component:ProductComponent},
    {path:'add-product/:pid',component:CreateProductComponent},
    {path: 'product-details/:pid',component:ProductDetailsComponent}
];
