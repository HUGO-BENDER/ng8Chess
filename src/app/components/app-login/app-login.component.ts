import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.css']
})
export class AppLoginComponent implements OnInit {
  providers = AuthProvider;

  constructor(private translate: TranslateService, public dialogRef: MatDialogRef<AppLoginComponent>) { }

  ngOnInit() {
  }

  errorCallback(errorData: any) {
    console.log('login con errorCallback', errorData);
    this.dialogRef.close();
  }

  successCallback(signInSuccessData: any) {
    console.log('login con exito successCallback', signInSuccessData);
    this.translate.get('App.Msg.Welcome', { value: signInSuccessData.displayName }).subscribe((res: string) => {
      this.ShowToastMessage(res);
      this.dialogRef.close();
    })
  }

  ShowToastMessage(msg: any) {
    Swal.fire({
      toast: true,
      position: 'top',
      type: 'success',
      title: msg,
      showConfirmButton: false,
      timer: 2000
    });
  }






}
