import {Component, OnInit} from '@angular/core';
import {User} from "../../interfaces/user";
import {UserService} from "../../services/user.service";
import {UserMapperService} from "../../services/user-mapper.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private userMapperService : UserMapperService) {

  }

  ngOnInit(): void {
    this.userService.fetchUser().subscribe(response => {
      this.user = response;
    })
  }

}
