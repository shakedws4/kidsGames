import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LettersMazeComponent} from "./letters-maze/letters-maze.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LettersMazeComponent, SideNavComponent, HttpClientModule],
  providers:[HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'kidsGamesApp';
}
