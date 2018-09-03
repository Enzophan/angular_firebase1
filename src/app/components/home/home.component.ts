import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
// export class HomeComponent implements OnInit {
//   products: Product[];

//   constructor(private productService: ProductService) { }

//   ngOnInit() {
//     console.log('ngOnInit run...');
//     this.productService.getProducts().subscribe(products =>{
//       console.log(products);
//       this.products = products;

//     })
//   }


// }

export class HomeComponent implements OnInit {
  products$;
  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    console.log('ngOnInit run Home page...');
    this.productsCollection = this.afs.collection('products', ref => ref.orderBy('orderNo', 'asc'));

    this.products$ = this.productsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      })
    });
  }


}