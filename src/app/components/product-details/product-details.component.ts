import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
     product:any;

     constructor (private productService:ProductService, 
      private router:Router, private route:ActivatedRoute){}
      
      ngOnInit(): void {
        const idParam = this.route.snapshot.paramMap.get('pid');
    
        if(idParam){
          this.productService.getSingleProduct(+idParam).subscribe(
            {
              next: (productData) => {
                // Handle the fetched product data
                this.product = productData;
                this.router.navigate(['/product-details', idParam]);  // Navigates to the product-details route
              },
              error: (err) => {
                console.error('Error fetching product details:', err);
              },
              complete: () => {
                console.log('Product details fetched successfully.');
              }
            });
        }
      }
    
      goBack(): void {
        this.router.navigate(['/products']);
      }
 
}
