import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kupac } from './kupac';

describe('Kupac', () => {
  let component: Kupac;
  let fixture: ComponentFixture<Kupac>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kupac]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kupac);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
