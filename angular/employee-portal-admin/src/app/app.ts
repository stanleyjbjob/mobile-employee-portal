import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app-simple.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'Employee Portal Admin';
}
