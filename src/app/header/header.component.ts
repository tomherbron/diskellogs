import {Component} from '@angular/core';
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private tokenService: TokenService, private router: Router,
              private toasterService: ToastrService) {
  }

  isAuthenticated(): boolean {
    return this.tokenService.isLoggedIn();
  }

  logOut(): void {
    this.tokenService.clearToken();
    this.router.navigateByUrl("/")
      .then(r => this.toasterService.success("You've been logged out."));
  }
}
