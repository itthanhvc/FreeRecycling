import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { User } from '../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: User;
  loading = false;
  error: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private dataService: DataService) { }

  ngOnInit() {
    this.model = new User();
    // reset login status
    this.authenticationService.logout();
  }
  register() {
    this.error = "";
    this.loading = true;
    this.dataService.createUser(this.model)
      .subscribe(
      response => {
        this.loading = false;
        if (response.type == false) {
          this.error = response.data;
          return;
        }
        this.router.navigate(['/login']);
      },
      error => {
        this.loading = false;
      });
  }
}
