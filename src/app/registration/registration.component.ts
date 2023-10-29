import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {MapperService} from "../services/mapper.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private mapperService: MapperService) {
    this.formBuilder = formBuilder;
  }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConf: ['',[Validators.required, Validators.minLength(8)]]
    },{ validators: this.passwordMatchValidator });
  }

  registerUser(): void {
    if (this.registrationForm.valid){
      const formData = this.registrationForm.value;
      const cleanedFormData = this.mapperService.mapDataToAPI(formData);
      this.authService.registerUser(cleanedFormData).subscribe(response => {
        console.log(response)
      });
    } else {
      console.log("Error in form...")
    }
  }

  passwordMatchValidator(control: FormGroup): ValidationErrors | null {
    const password = control.get('password');
    const passwordConf = control.get('passwordConf');

    return password && passwordConf && password.value === passwordConf.value ? null : { passwordMismatch: true };
  };
}
