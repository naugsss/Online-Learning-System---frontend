import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminMentorComponent } from './admin-mentor.component';
import { FormsModule } from '@angular/forms';

describe('admin mentor component', () => {
  let component: AdminMentorComponent;
  let fixture: ComponentFixture<AdminMentorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AdminMentorComponent],
    });
    fixture = TestBed.createComponent(AdminMentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
