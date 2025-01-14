import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebCreatorComponent } from './web-creator.component';

describe('WebCreatorComponent', () => {
  let component: WebCreatorComponent;
  let fixture: ComponentFixture<WebCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
