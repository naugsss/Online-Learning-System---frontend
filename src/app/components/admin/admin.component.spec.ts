import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminComponent } from './admin.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { FormsModule } from '@angular/forms';

describe('admin component', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AdminComponent, AdminCoursesComponent],
    });
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should switch to mentor dashboard when mentor button is clicked', () => {
    component.changeComponent = true;
    component.mentorButtonClicked();
    expect(component.changeComponent).toBeFalsy();
  });

  it('should switch to admin dashboard when course button is clicked', () => {
    component.changeComponent = true;
    component.courseButtonClicked();
    expect(component.changeComponent).toBeTruthy();
  });
});
