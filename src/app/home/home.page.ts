import { Component } from "@angular/core";

declare var gapi: any;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  // gapi.load("client:auth2", {});
  constructor() {
    console.log("Homepage");
    gapi.load('client:auth2', {});
    gapi.auth2.init({
      client_id:
        "100381643672-8lhladq1r41itq8os3fredoskl3ssn20.apps.googleusercontent.com"
    });
    console.log('gapi.auth2: '+gapi.auth2);
    // console.log(gapi.auth2);
    this.login().then(res => {
      console.log('login');
      console.log(res);
    });
  }

  login() {
    return new Promise((resolve, reject) => {
      gapi.auth2.getAuthInstance()
        .signIn({
          scopes:
            "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.file",

          // webClientId:
          //   '177623487387-ub00lhs0hd5h6cnbo71pj92jaq0ujuat.apps.googleusercontent.com', //(web)

          offline: false
        })
        .then(
          res => {
            console.log("login: " + JSON.stringify(res));
            // if (res.hasOwnProperty('accessToken')) {
            //   this.storageProvider.saveLoginInfo(res.accessToken);
            //   this.accessToken = res.accessToken;
            // }
            // this.loadRecentFile();
            // this.token = res;
            // this.loggedin = true;
            resolve(res);

            // this.recent.setItem("token", res);
            // this.drive.setAccesstoken(this.token.accessToken);
          },
          err => {
            console.log("login_err: " + err);
            reject(err);
          }
        );
    });
  }
}
