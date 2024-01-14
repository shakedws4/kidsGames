import { Routes } from '@angular/router';
import {LettersMazeComponent} from "./letters-maze/letters-maze.component";
import {HomeComponent} from "./home/home.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'maze', component: LettersMazeComponent },
];
