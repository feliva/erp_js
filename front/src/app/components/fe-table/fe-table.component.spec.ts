import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeTableComponent } from './fe-table.component';

describe('FeTableComponent', () => {
  let component: FeTableComponent;
  let fixture: ComponentFixture<FeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
