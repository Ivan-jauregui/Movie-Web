import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedPublicationCardComponent } from './associated-publication-card.component';

describe('AssociatedPublicationCardComponent', () => {
  let component: AssociatedPublicationCardComponent;
  let fixture: ComponentFixture<AssociatedPublicationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatedPublicationCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedPublicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
