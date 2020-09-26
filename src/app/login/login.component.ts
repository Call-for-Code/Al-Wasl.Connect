import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { AuthService } from  '../auth.service';

import { ToastrService } from "ngx-toastr";
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $:any;

 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private toastr: ToastrService,private router: Router,private authService: AuthService, private formBuilder: FormBuilder
    ) { }

    authForm: FormGroup;
  isSubmitted  =  false;

  ngOnInit(): void {
    this.authForm  =  this.formBuilder.group({
      regno: ['', [Validators.required]],
      password: ['', Validators.required],
      type:'government'
    });

    this.utilFunctions();
    
  }

  get formControls() { return this.authForm.controls; }
  
  signIn(){
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }

    if(this.authForm.value.regno == 'govt' && this.authForm.value.password == 'admin'){
      this.authService.signIn(this.authForm.value);
      this.router.navigateByUrl('/government');
    }else{
      this.toastr.error(
        '<span data-notify="icon" class="nc-icon nc-simple-remove"></span><span data-notify="message">Invalid Login!</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-error alert-with-icon",
          positionClass: "toast-bottom-right"
        }
      );
    }
    
  }

  utilFunctions(){
    $('.js-tilt').tilt({
			scale: 1.1
    });
    
  //   var input = $('.validate-input .input100');

  //   $('#loginButton').on('click',function(){
  //       var check = true;

  //       for(var i=0; i<input.length; i++) {
  //           if(validate(input[i]) == false){
  //               showValidate(input[i]);
  //               check=false;
  //           }
  //       }

  //       return check;
  //   });


  //   $('.validate-form .input100').each(function(){
  //       $(this).focus(function(){
  //          hideValidate(this);
  //       });
  //   });

  //   function validate (input) {
  //       if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
  //           if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
  //               return false;
  //           }
  //       }
  //       else {
  //           if($(input).val().trim() == ''){
  //               return false;
  //           }
  //       }
  //   }

  //   function showValidate(input) {
  //       var thisAlert = $(input).parent();

  //       $(thisAlert).addClass('alert-validate');
  //   }

  //   function hideValidate(input) {
  //       var thisAlert = $(input).parent();

  //       $(thisAlert).removeClass('alert-validate');
  //   }
  // }
  }
  
}
