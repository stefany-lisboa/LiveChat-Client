import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenConversationsComponent } from './open-conversations.component';

describe('OpenConversationsComponent', () => {
  let component: OpenConversationsComponent;
  let fixture: ComponentFixture<OpenConversationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenConversationsComponent]
    });
    fixture = TestBed.createComponent(OpenConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
