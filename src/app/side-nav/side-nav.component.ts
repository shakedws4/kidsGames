import {ChangeDetectionStrategy, Component, Input, signal} from '@angular/core';
import {CommonModule, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NavBarItems} from "../helpers/consts";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
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
    RouterLink],
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideNavComponent {

  @Input() isOpen: boolean = true;

  public navBarItems: NavBarItem[] = NavBarItems;
  public selectedPath = this.navBarItems[0].path;

  public setSelectedPath(path: string): void {
    this.selectedPath = path;
  }

}


