import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {UserMapperService} from "../services/user-mapper.service";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private authService: AuthService,
              private mapperService: UserMapperService,
              private router: Router,
              private toasterService: ToastrService) {

  }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      passwordConf: new FormControl('', [Validators.required, Validators.minLength(8)])
    }, {validators: this.passwordMatchValidator});
  }

  registerUser(): void {
    if (this.registrationForm.valid){
      const formData = this.registrationForm.value;
      const cleanedFormData = this.mapperService.mapDataToAPI(formData);
      this.authService.registerUser(cleanedFormData).subscribe(response => {
        if (response.status === 'success'){
          this.router.navigateByUrl("/home")
            .then(r => this.toasterService.success("Successfully registered!"));
        } else {
           this.toasterService.error("User already exists. Please login!");
        }
      });
    } else {
      this.toasterService.error("Subscription form is invalid.");
    }
  }

  get firstName(){
    return this.registrationForm.get('firstName');
  }

  get lastName(){
    return this.registrationForm.get('lastName');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get passwordConf(){
    return this.registrationForm.get('passwordConf');
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConf = control.get('passwordConf');

    return password && passwordConf && password.value === passwordConf.value ? null : { passwordMismatch: true };
  };
}
