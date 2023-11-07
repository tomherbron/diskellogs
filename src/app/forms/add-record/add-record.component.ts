import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserMapperService} from "../../services/user-mapper.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.css']
})
export class AddRecordComponent implements OnInit {

  recordForm: FormGroup;

  constructor(private userService: UserService, private mapperService: UserMapperService,
              private router: Router, private toasterService: ToastrService) {
  }

  ngOnInit(): void {
    this.recordForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      artist: new FormControl('', [Validators.required, Validators.minLength(1)]),
      ref: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(6)]),
      genre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      price: new FormControl('', [Validators.required]),
      releaseYear: new FormControl('', [Validators.required])
    });
  }

  addRecord() {
    if (this.recordForm.valid){
      const formData = this.recordForm.value;
      const cleanedFormData = this.mapperService.mapRecordDataToApi(formData);
      this.userService.addRecord(cleanedFormData).subscribe(response => {
        if (response.status === 'success'){
          this.router.navigateByUrl("/home")
            .then(r => this.toasterService.success("Record added to collection!"));
        } else {
          this.toasterService.error("Record couldn't be added.");
        }
      });
    } else {
      this.toasterService.error("Add record form is invalid.");
    }
  }
}
