import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { auth } from 'firebase';
import { NgxSpinnerService } from 'ngx-spinner';
import { Account } from './../models/account';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  account: Observable<Account>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {

    this.account = this.afAuth.authState
      .switchMap(account => {
        if (account) {
          return this.afs.doc<Account>(`accounts/${account.uid}`).valueChanges()
        } else {
          return Observable.of(null)
        }
      })

  }


  googleLogin() {
    this.spinner.show();
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(() => {
        this.spinner.hide();
      })
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateAccountData(credential.user)
      })
  }

  private updateAccountData(account) {
    const accountRef: AngularFirestoreDocument<Account> = this.afs.doc(`accounts/${account.uid}`);

    const data: Account = {
      uid: account.uid,
      email: account.email,
      photoURL: account.photoURL,
      displayName: account.displayName,
      catchPhrase: account.catchPhrase || null,
      roles: {
        subscriber: true
      }
    }
    return accountRef.set(data, { merge: true });

  }


  signOut() {
    this.spinner.show();
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
      this.spinner.hide();
    });
  }
}
