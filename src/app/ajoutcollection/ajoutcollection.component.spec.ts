import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutcollectionComponent } from './ajoutcollection.component';

describe('AjoutcollectionComponent', () => {
  let component: AjoutcollectionComponent;
  let fixture: ComponentFixture<AjoutcollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutcollectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutcollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
