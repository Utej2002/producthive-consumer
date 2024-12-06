import { Injectable } from '@angular/core';
import { HttpClient ,HttpErrorResponse} from '@angular/common/http';
import { Observable , throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

//service layer interacts with the Rest-Api
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseURL="http://localhost:8088/producthive/api/products"
  constructor(private http:HttpClient) { }

  getProductList():Observable<any>{
     return this.http.get(this.baseURL).pipe(
      catchError(this.handleError1)
     );


  }
   //makes POST request to add new Product
   newProduct(product:Object):Observable<Object>{
    console.log(product);
    return this.http.post(`${this.baseURL}`, product)
    .pipe(
      catchError(this.handleError1)  // Handle errors
    );
  }
  getSingleProduct(pid:number):Observable<any>{

    return this.http.get(`${this.baseURL}/${pid}`)
    .pipe(
      catchError(this.handleError1)  // Handle errors
    ); 
  }
  updateProduct(pid:number,value:any):Observable<Object>{
    return this.http.put(`${this.baseURL}/${pid}`,value)
    .pipe(
      catchError(this.handleError1)  // Handle errors
    );
  }
  deleteProduct(pid:number):Observable<any>{
    return this.http.delete(this.baseURL + '/' + pid,{responseType:'text'})
    .pipe(
      catchError(this.handleError1)  // Handle errors
    );
  }
  
    // Handle errors globally
   private handleError1(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));  // Return an observable with a user-facing error message
  }
  }


