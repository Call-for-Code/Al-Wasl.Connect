import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import {ngxLoadingAnimationTypes} from 'ngx-loading'
import { AuthService } from  '../../auth.service';
import { ToastrService } from "ngx-toastr";

import { HttpService }  from '../../http.service';
declare var $:any;

@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.css']
})
export class DonorComponent implements OnInit {

  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

  constructor( 
    private router: Router,
    private authService: AuthService,
    private _httpService:HttpService,
    private toastr: ToastrService,
     private formBuilder: FormBuilder) { }

     authDonorForm: FormGroup;
     isSubmitted  =  false;
     loading = false;

  ngOnInit(): void {
    
    this.authDonorForm  =  this.formBuilder.group({
      regno: ['', [Validators.required, Validators.minLength(13),Validators.maxLength(13),Validators.pattern("^[0-9]*$")]],
      password: ['', Validators.required],
      type:'donor'
    });

   this.utilFunctions();
  }
  get formControls() { return this.authDonorForm.controls; }
  
  signIn(){
    this.isSubmitted = true;
    if(this.authDonorForm.invalid){
      return;
    }
    this.loading = true;
    // this.authService.signIn(this.authDonorForm.value)
    //       this.loading = false;
    //       this.router.navigate(['/dashboard'],{state: {data: this.authDonorForm.value.regno}});
         
    this._httpService.getDonorLogin(this.authDonorForm.value).subscribe(data=>{
      if(data['success'] != 1){
        this.toastr.error(
          '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message">DB Error!</span>',
          "",
          {
            timeOut: 3000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-warning alert-with-icon",
            positionClass: "toast-bottom-right"
          }
        );
        this.loading = false
      }
      else{
        var login = data['data'];
        if(login.length > 0){
          this.authService.signIn(this.authDonorForm.value)
          this.loading = false;
          localStorage.setItem('NGOID', this.authDonorForm.value.regno);
          localStorage.setItem('NGOKEY', login[0].ID);
          localStorage.setItem('NGONAME',login[0].Name )
          this.router.navigate(['/dashboard']);
          
        }else{
          this.toastr.error(
            '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message">Invalid Login!</span>',
            "",
            {
              timeOut: 3000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-danger alert-with-icon",
              positionClass: "toast-bottom-right"
            }
          );
          this.loading = false
        }
      }
    })
    
  }


  utilFunctions(){
    $('.js-tilt').tilt({
			scale: 1.1
		})
  }

}
