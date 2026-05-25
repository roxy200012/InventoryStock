import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementNewComponent } from './movement-new-component';

describe('MovementNewComponent', () => {
  let component: MovementNewComponent;
  let fixture: ComponentFixture<MovementNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
