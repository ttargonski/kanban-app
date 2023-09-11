import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';

import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

import { User } from './user';

import { DataService } from 'src/app/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public userData: User = {
    uid: '',
    email: '',
    emailVerified: false,
  };

  constructor(
    private afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    public ngZone: NgZone,
    private router: Router,
    private fireData: DataService
  ) {
    /* Saving user data in localstorage when

    logged in and setting up null when logged out */

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = {
          uid: user.uid,
          email: user.email ? user.email : '',
          emailVerified: user.emailVerified,
        };

        localStorage.setItem('user', JSON.stringify(this.userData));

        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');

        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Sign in with email/password

  SignIn(email: string, password: string) {
    return this.afAuth

      .signInWithEmailAndPassword(email, password)

      .then((result) => {
        this.SetUserData(result.user);

        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.fireData.getBoards(user.uid);
            this.router.navigate(['']);
          }
        });
      })

      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign up with email/password

  SignUp(email: string, password: string) {
    return this.afAuth

      .createUserWithEmailAndPassword(email, password)

      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
    
            up and returns promise */

        this.SendVerificationMail();

        this.SetUserData(result.user);
      })

      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verfificaiton when new user sign up

  SendVerificationMail() {
    return this.afAuth.currentUser

      .then((u: any) => u.sendEmailVerification())

      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  // Reset Forggot password

  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth

      .sendPasswordResetEmail(passwordResetEmail)

      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })

      .catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is looged in and email is verified

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);

    return user !== null && user.emailVerified !== false ? true : false;
  }

  // return user email
  public getUserEmail(): string {
    return this.userData.email;
  }

  // return user id
  public getUserId(): string {
    return this.userData.uid;
  }

  // Sign in with Google

  googleSignIn() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider()).then(
      (res) => {
        let user = res.user;
        this.SetUserData(res.user);
        if (user) {
          this.fireData.getBoards(user.uid);
        }
        this.router.navigate(['']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  /* Setting up user data when sign in with username/password,
    
      sign up with username/password and sign in with social auth  
    
      provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    };

    this.userData = {
      uid: user.uid,
      email: user.email ? user.email : '',
      emailVerified: user.emailVerified,
    };

    return userRef.set(userData, {
      merge: true,
    });
  }

  // Sign out

  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
