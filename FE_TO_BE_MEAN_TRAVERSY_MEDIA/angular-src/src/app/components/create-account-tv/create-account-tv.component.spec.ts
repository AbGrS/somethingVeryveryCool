import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccountTvComponent } from './create-account-tv.component';

describe('CreateAccountTvComponent', () => {
  let component: CreateAccountTvComponent;
  let fixture: ComponentFixture<CreateAccountTvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAccountTvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAccountTvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
