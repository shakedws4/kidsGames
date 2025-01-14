import {Component, inject, Renderer2} from '@angular/core';
import {CdkDrag, CdkDropList} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-web-creator',
  standalone: true,
  imports: [CdkDrag, CdkDropList],
  templateUrl: './web-creator.component.html',
  styleUrl: './web-creator.component.scss'
})
export class WebCreatorComponent {

  private _renderer = inject(Renderer2);
  private _activeCopy: HTMLElement | null = null;
  private _selectedElement: HTMLElement | null = null;
  private dragOffsetX: number = 0;
  private dragOffsetY: number = 0;

  public myWebText = 'האתר של';
  public elementsTitle = 'דמויות';
  public shapesTitle = 'צורות';
  public actionsTitle = 'פעולות';
  public designColorTitle = 'צבע';
  public designSizeTitle = 'גודל';
  public colors = ['var(--pink)', 'var(--light-blue)', 'var(--light-green)', 'var(--yellow)', 'var(--orange)','red', 'var(----white)'];
  public elementsNames = ['boy', 'girl', 'baby', 'mom', 'dad', 'dog', 'cat', 'bird'];
  public publishMode: boolean = false;


  onDragging(event: MouseEvent, element: HTMLElement, modifications: string, clone: boolean = true): void {
    if (this.publishMode) {
      return;
    }
    // Determine the active element (clone or original)
    if (clone) {
      this._activeCopy = element.cloneNode(true) as HTMLElement;
      const targetContainer = document.querySelector('.body');
      if (targetContainer) {
        targetContainer.appendChild(this._activeCopy);
      }
    } else {
      this._activeCopy = element;
    }

    // Calculate initial drag offsets
    const rect = element.getBoundingClientRect();
    this.dragOffsetX = event.clientX - rect.left;
    this.dragOffsetY = event.clientY - rect.top;

    // Style the active copy
    this._renderer.setStyle(this._activeCopy, 'left', `${rect.left}px`);
    this._renderer.setStyle(this._activeCopy, 'top', `${rect.top}px`);

    // Add custom classes
    const classes = this._activeCopy.className.replace('original', '');
    this._renderer.setAttribute(this._activeCopy, 'class', `${classes} ${modifications} copy`);

    // Add click and mousedown listeners
    this._activeCopy.onclick = (e: MouseEvent) => {
      e.stopPropagation();
      const currentElement = e.currentTarget as HTMLElement;
      this.selectedElement(e, currentElement);
    };

    this._activeCopy.onmousedown = (e: MouseEvent) => {
      e.stopPropagation(); // Prevent propagation to avoid conflicts
      const currentElement = e.currentTarget as HTMLElement;
      this.onDragging(e, currentElement, modifications, false); // Start dragging without cloning
      this.selectedElement(e, currentElement);
    };

    // Attach global drag event listeners
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent): void => {
    if (this._activeCopy) {
      const x = event.clientX - this.dragOffsetX;
      const y = event.clientY - this.dragOffsetY;
      this._renderer.setStyle(this._activeCopy, 'left', `${x}px`);
      this._renderer.setStyle(this._activeCopy, 'top', `${y}px`);
    }
  };

  onMouseUp = (): void => {
    // Clean up listeners
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
    this._activeCopy = null; // Reset active copy
  };

  selectedElement(event: MouseEvent, originalElement: HTMLElement): void {
    event.stopPropagation();
    // clear current selected before setting a new one
    if (this._selectedElement) {
      const classes = this._selectedElement.className?.replace('selected', '')
      this._renderer.setAttribute(this._selectedElement, 'class', classes);
    }
    // set a new selected
    this._selectedElement = originalElement;
    const classes = this._selectedElement.className;
    this._renderer.setAttribute(this._selectedElement, 'class', `${classes} selected`);
  }

  addAction(action: 'jump' | 'swing' | 'spin'): void {
    if (this._selectedElement && this._selectedElement.classList.contains('actionable')) {
      this.removeAction();
      this._renderer.addClass(this._selectedElement, `${action}-action`);
    }
  }

  removeAction(): void {
    if (this._selectedElement && this._selectedElement.classList.contains('actionable')) {
      const actionClass = this._selectedElement.className.split(' ').find(c => c.includes('-action'));
      if (actionClass) {
        this._renderer.removeClass(this._selectedElement, actionClass);
      }
    }
  }

  changeColor(color: string) {
    if (this._selectedElement && this._selectedElement.classList.contains('colorable')) {
      this._renderer.setStyle(this._selectedElement, 'color', color);
    }
    if (this._selectedElement && this._selectedElement.classList.contains('backgroundColorable')) {
      this._renderer.setStyle(this._selectedElement, 'background-color', color);
    }
  }

  bigger(bigger: boolean) {
    if (this._selectedElement && this._selectedElement.classList.contains('sizable')) {
      const currentWidth = this._selectedElement.clientWidth;
      const currentHeight = this._selectedElement.clientHeight;
      if (bigger) {
        if (currentWidth < 550) {
          this._renderer.setStyle(this._selectedElement, 'width', `${currentWidth + 10}px`);
          this._renderer.setStyle(this._selectedElement, 'height', `${currentHeight + 10}px`);
        }
      } else {
        if (currentWidth > 60) {
          this._renderer.setStyle(this._selectedElement, 'width', `${currentWidth - 10}px`);
          this._renderer.setStyle(this._selectedElement, 'height', `${currentHeight - 10}px`);
        }
      }
    }
  }

  publish() {
    this.publishMode = true;
  }

  edit() {
    this.publishMode = false;
  }

}
