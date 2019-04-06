import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatImageUploadComponent } from './chat-image-upload.component';

describe('ChatImageUploadComponent', () => {
  let component: ChatImageUploadComponent;
  let fixture: ComponentFixture<ChatImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
