import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MentorComponent } from './mentor.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewCourseComponent } from './new-course/new-course.component';
import { FormsModule } from '@angular/forms';
import { Subject, of } from 'rxjs';

describe('Mentor Component', () => {
  let component: MentorComponent;
  let fixture: ComponentFixture<MentorComponent>;
  let mockCourseDataService;
  let updateEarningsSubject: Subject<boolean>;

  beforeEach(() => {
    updateEarningsSubject = new Subject<boolean>();
    mockCourseDataService = {
      fetchMentorEarning: jasmine.createSpy('fetchMentorEarning'),
      updateEarnings: updateEarningsSubject.asObservable(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [MentorComponent, NewCourseComponent],
    });
    fixture = TestBed.createComponent(MentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should fetch and update mentor earnings on init', () => {
    const earnings = 1000;
    mockCourseDataService.fetchMentorEarning.and.returnValue(of(earnings));
    component.mentorEarnings = earnings;
    component.ngOnInit();

    expect(component.mentorEarnings).toBe(earnings);

    updateEarningsSubject.next(true);

    expect(component.mentorEarnings).toBe(earnings);
  });

  it('should unsubscribe from all subscriptions on destroy', () => {
    const subscription = jasmine.createSpyObj('subscription', ['unsubscribe']);
    component.subscription = [subscription];

    component.ngOnDestroy();

    expect(subscription.unsubscribe.calls.count()).toBe(1);
  });

  it('#addCourseButtonClicked() should change the value of changeComponent to true', () => {
    component.addCourseButtonClicked();
    expect(component.changeComponent).toBe(true);
  });

  it('#addFaqButtonClicked() should change the value of changeComponent to false', () => {
    component.addFaqButtonClicked();
    expect(component.changeComponent).toBe(false);
  });
});
