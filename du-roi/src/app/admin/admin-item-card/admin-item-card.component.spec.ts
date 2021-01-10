import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminItemCardComponent } from './admin-item-card.component';

describe('ItemCardComponent', () => {
  let component: AdminItemCardComponent;
  let fixture: ComponentFixture<AdminItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
