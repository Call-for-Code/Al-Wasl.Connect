import { Component, OnInit } from '@angular/core';
import {Names} from'../../_helper/names'

import { ToastrService } from "ngx-toastr";
declare var $:any;


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(private toastr: ToastrService) { }
  cnic: any = ''
  ngOnInit(): void {
    this.utilFunction()
  }

  utilFunction(){
    $('.js-tilt').tilt({
			scale: 1.1
    });
    const component = this;
    var form = $("#signup-form");
    form.steps({
      headerTag: "h3",
      bodyTag: "fieldset",
      transitionEffect: "fade",
      labels: {
        previous: "Previous",
        next: "Next",
        finish: "Finish",
        current: "",
      },
      titleTemplate: '<h3 class="title">#title#</h3>',
      onStepChanged: function (event, currentIndex, priorIndex) {

         if (currentIndex === 1 && priorIndex === 0) {
           console.log($('#name').val().length)
          if( $('#name').val().length == 0){
            $('#name').text(Names[Math.floor(Math.random() *49)].Name)
            $('#fathername').text(Names[Math.floor((Math.random()*49))]["Father Name"])
     
          }
          
        }
      },
      onFinished: function (event, currentIndex) {
        component.toastr.success(
          '<span data-notify="icon" class="nc-icon nc-check-2"></span><span data-notify="message">Registration Successful! Your Request has been sent.</span>',
          "",
          {
            timeOut: 4000,
            closeButton: true,
            enableHtml: true,
            toastClass: "alert alert-success alert-with-icon",
            positionClass: "toast-bottom-right"
          }
        );
        // $("#registerResponse").text("Registration Successful! Please Login");
        // $("#resId").css("display", "block");
        // $("#citizenid").removeClass("p-t-136").addClass("p-t-100");
      },
    });
  }

}
