import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatImageSelectionComponent } from './chat-image-selection.component';

describe('ChatImageSelectionComponent', () => {
  let component: ChatImageSelectionComponent;
  let fixture: ComponentFixture<ChatImageSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatImageSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatImageSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
