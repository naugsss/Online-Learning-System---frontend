import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFaqComponent } from './add-faq.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NewCourseComponent } from '../new-course/new-course.component';

describe('Add Faq Component', () => {
  let component: AddFaqComponent;
  let fixture: ComponentFixture<AddFaqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [AddFaqComponent],
    });
    fixture = TestBed.createComponent(AddFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
