import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportantNotes } from './important-notes';

describe('ImportantNotes', () => {
  let component: ImportantNotes;
  let fixture: ComponentFixture<ImportantNotes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportantNotes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportantNotes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
