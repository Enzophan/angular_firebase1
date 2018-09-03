import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Product } from '../models/product';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productsCollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  constructor(public afs: AngularFirestore) { 
    this.productsCollection = this.afs.collection('products', ref => ref.orderBy('orderNo', 'asc'));

    this.products = this.productsCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      })
    });

    // this.products = this.afs.collection('products').valueChanges();

  }
  
  getProducts(){
    return this.products;
  }


}
