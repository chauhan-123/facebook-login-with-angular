import { Component, OnInit , AfterViewInit } from '@angular/core';
declare var FB: any;
declare const gapi: any;
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  auth2: any;
  constructor (private _router : Router){
}

// this code represent the facebook
ngOnInit() {
  (window as any).fbAsyncInit = function() {
    FB.init({
      appId      : '2406567612897920',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.1'
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

}
 
// faceboo click function method
onFacebookButtonClicked() {
  FB.getLoginStatus((response) => {
  if (response.status === 'connected') {
  this.getUserprofileDetails(response.authResponse.accessToken);
  } else {
  FB.login((loginResponse) => {
  this.getUserprofileDetails(loginResponse.authResponse.accessToken);
  }, {scope: 'email'});
  }
  });
  }
  getUserprofileDetails(token: any) {
  FB.api('/v2.9/me', 'get', {access_token: token, fields: 'id,name,email,gender,picture'}, (res) => {
    console.log(res,'----------')
  // this.yourSuccessMethod(res.email, res.id, 'Facebook');
  });
  }

  // google method
  ngAfterViewInit() {
    this.googleInit();
    }

    public googleInit() {
      gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
      client_id: 'YourClientID.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
      });
      }

      public attachSignin(element) {
        this.auth2.attachClickHandler(element, {},
        (googleUser) => {
        const profile = googleUser.getBasicProfile();
        // this.yourSuccessMethod(profile.getEmail(), profile.getId(), 'Google');
        }, (error) => {
        console.log(error);
        });
        }

}
