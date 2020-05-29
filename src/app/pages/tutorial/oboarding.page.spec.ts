import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OboardingPage } from './oboarding.page';

describe('OboardingPage', () => {
  let component: OboardingPage;
  let fixture: ComponentFixture<OboardingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OboardingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OboardingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
