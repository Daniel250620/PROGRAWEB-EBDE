import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoketablaComponent } from './poketabla.component';

describe('PoketablaComponent', () => {
  let component: PoketablaComponent;
  let fixture: ComponentFixture<PoketablaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoketablaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoketablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
