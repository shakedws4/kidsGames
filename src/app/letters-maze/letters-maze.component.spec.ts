import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LettersMazeComponent } from './letters-maze.component';

describe('LettersMazeComponent', () => {
  let component: LettersMazeComponent;
  let fixture: ComponentFixture<LettersMazeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LettersMazeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LettersMazeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
