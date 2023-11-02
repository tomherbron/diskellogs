import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.fetchUser().subscribe(response => {
      this.user = response;
    })
  }

}
