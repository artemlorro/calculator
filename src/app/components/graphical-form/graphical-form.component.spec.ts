import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicalFormComponent } from './graphical-form.component';

describe('GraphicalFormComponent', () => {
  let component: GraphicalFormComponent;
  let fixture: ComponentFixture<GraphicalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphicalFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphicalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
