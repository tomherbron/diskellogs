import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserMapperService} from "../services/user-mapper.service";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../services/token.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private mapperService: UserMapperService,
              private router: Router, private toasterService: ToastrService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  loginUser(): void {
    if (this.loginForm.valid){
      const credentials = this.loginForm.value;
      const cleanedCredentials = this.mapperService.mapUserDataForLogin(credentials);
      this.authService.loginUser(cleanedCredentials).subscribe(response => {
          if (response.status === "success") {
            this.tokenService.saveToken(response.token);
            this.router.navigateByUrl("/home")
              .then(r => this.toasterService.success("Successfully logged in!"));
          } else {
              this.toasterService.error("Wrong credentials.");
          }
        }
      );
    }
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
