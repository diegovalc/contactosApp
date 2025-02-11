import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OlvidoPasswordComponent } from './olvido-password.component';

describe('OlvidoPasswordComponent', () => {
  let component: OlvidoPasswordComponent;
  let fixture: ComponentFixture<OlvidoPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OlvidoPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OlvidoPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
