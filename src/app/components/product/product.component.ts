import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product$;
  
  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('ngOnInit Product detail run...');
    this.product$ = this.route.paramMap.pipe(
      switchMap(params =>{
        const id = params.get('id');
        return this.afs.doc('products/'+ id).valueChanges();

      })
    );

  }

}
