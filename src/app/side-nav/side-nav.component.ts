import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
interface NavBarItem {
  title: string;
  path: string;
}
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent {

  public navBarItems: NavBarItem[] = [
    {title: 'home', path: 'home'},
    {title: 'maze', path: 'maze'}
  ]

}
