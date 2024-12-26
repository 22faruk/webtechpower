import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendlistViewComponent } from './friendlist-view.component';

describe('FriendlistViewComponent', () => {
  let component: FriendlistViewComponent;
  let fixture: ComponentFixture<FriendlistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendlistViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendlistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
