import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Radnik } from './radnik';

describe('Radnik', () => {
  let component: Radnik;
  let fixture: ComponentFixture<Radnik>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Radnik]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Radnik);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
