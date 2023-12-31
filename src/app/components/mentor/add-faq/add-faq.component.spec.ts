import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddFaqComponent } from './add-faq.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CourseDataService } from 'src/app/shared/courseData.service';

describe('AddFaqComponent', () => {
  let component: AddFaqComponent;
  let fixture: ComponentFixture<AddFaqComponent>;
  let mockCourseDataService: jasmine.SpyObj<CourseDataService>;

  beforeEach(() => {
    mockCourseDataService = jasmine.createSpyObj('CourseDataService', [
      'addFaq',
    ]);
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [AddFaqComponent],
      providers: [
        { provide: CourseDataService, useValue: mockCourseDataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize component properties', () => {
    expect(component.faq).toEqual('');
    expect(component.faqAnswer).toEqual('');
    expect(component.name).toEqual('');
    expect(component.faqs.length).toEqual(1);
    expect(component.faqs[0].question).toEqual('');
    expect(component.faqs[0].answer).toEqual('');
  });

  it('should add new FAQs', () => {
    component.addFaq();
    expect(component.faqs.length).toEqual(2);
    expect(component.faqs[1].question).toEqual('');
    expect(component.faqs[1].answer).toEqual('');
  });

  it('should remove existing FAQs', () => {
    component.removeFaq();
    expect(component.faqs.length).toEqual(0);
  });
  
  it('should call addFaq service for each FAQ on form submission', () => {
    component.faqs = [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
    ];
    component.name = 'Test Course';

    component.onSubmitFaq();

    expect(mockCourseDataService.addFaq).toHaveBeenCalledTimes(2);
    expect(mockCourseDataService.addFaq).toHaveBeenCalledWith(
      { question: 'Q1', answer: 'A1' },
      'Test Course'
    );
    expect(mockCourseDataService.addFaq).toHaveBeenCalledWith(
      { question: 'Q2', answer: 'A2' },
      'Test Course'
    );
    expect(component.faqs.length).toEqual(1);
    expect(component.name).toEqual('');
  });
});
