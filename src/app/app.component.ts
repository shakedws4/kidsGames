import {Component, Inject} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LettersMazeComponent} from "./letters-maze/letters-maze.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {MainService} from "../services/main.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LettersMazeComponent, SideNavComponent, HttpClientModule, NgOptimizedImage],
  providers:[HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private _service: MainService) {}

  navBarState$$ = this._service.navBarState$$;
  title = 'kidsGamesApp';

  toggleNavbarState(): void {
    this._service.toggleNavbarState();
  }

}


