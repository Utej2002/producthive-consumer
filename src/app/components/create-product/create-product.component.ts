import { Component } from '@angular/core';
import { Product } from '../product/model/product';
import { ProductService } from '../../services/product.service';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  pid: number | null = null;  // Change id to number type
  name: string = '';
  brand: string = '';
  model: string = '';
  price: string = '';

  product: Observable<Product> | any;

  constructor (private productService:ProductService, private router:Router, private route:ActivatedRoute){}

  ngOnInit():void{
    const idParam=this.route.snapshot.paramMap.get('pid');

    if(idParam !=='_add'){
      this.pid=Number(idParam)
      
   this.productService.getSingleProduct(this.pid).subscribe((response: any) => {
    console.log(response);  // Log to confirm structure

    if (response) {  // Ensure the response exists
      // Assuming product details are directly in the response
      this.product = response;

      this.name = this.product.name ?? '';  // Use nullish coalescing to handle undefined values
      this.brand = this.product.brand ?? '';
      this.model = this.product.model ?? '';
      this.price = this.product.price ?? '';
    } else {
      console.error('Product data is missing in the response.');
    }
  });
}

    
    
  }
  saveOrUpdateProduct(): void {
    const product = { name: this.name, brand: this.brand, model: this.model, price: this.price };

    if (this.route.snapshot.paramMap.get('pid') === '_add') {
      this.productService.newProduct(product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    } else {
      this.productService.updateProduct( this.pid!,product).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  
  }
  cancel(): void {
    this.router.navigate(['/products']);
  }

  getTitle(): string {
    return this.route.snapshot.paramMap.get('pid') === '_add' ? 'Add Product' : 'Update Product';
  }
}
