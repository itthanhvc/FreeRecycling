import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./css/Main.css','./css/utilities.css']
})
export class AppComponent {
  public isCollapsed: boolean = true;
}
