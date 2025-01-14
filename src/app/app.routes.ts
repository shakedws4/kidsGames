import { Routes } from '@angular/router';
import {LettersMazeComponent} from "./letters-maze/letters-maze.component";
import {HomeComponent} from "./home/home.component";
import {CompleteComponent} from "./complete/complete.component";
import {WebCreatorComponent} from "./web-creator/web-creator.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'maze', component: LettersMazeComponent },
  { path: 'complete', component: CompleteComponent },
  { path: 'webPageCreator', component: WebCreatorComponent }
];
