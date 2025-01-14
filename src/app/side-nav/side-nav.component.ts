import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {CommonModule, NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NavBarItems} from "../helpers/consts";
import {MainService} from "../../services/main.service";
interface NavBarItem {
  title: string;
  titleHe: string;
  path: string;
}
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent {
  constructor(private _service: MainService) {}


  public navBarItems: NavBarItem[] = NavBarItems;
  public selectedPath = this.navBarItems[0].path;

  public setSelectedPath(path: string): void {
    this.toggleMenuState();
    this.selectedPath = path;
  }

  public toggleMenuState(): void {
    this._service.toggleNavbarState();
  }

}


