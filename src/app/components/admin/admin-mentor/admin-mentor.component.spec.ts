// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AdminMentorComponent } from './admin-mentor.component';
// import { FormsModule } from '@angular/forms';
// import { CourseDataService } from 'src/app/shared/courseData.service';
// import { of } from 'rxjs';

// describe('admin mentor component', () => {
//   let component: AdminMentorComponent;
//   let fixture: ComponentFixture<AdminMentorComponent>;
//   let mockCourseDataService: CourseDataService;
//   let mockEarnings = { name: 'John Doe', earnings: 100 };
//   beforeEach(() => {
//     mockCourseDataService = jasmine.createSpyObj('CourseDataService', [
//       'fetchMentorEarning',
//       'addMentor',
//     ]);

//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, FormsModule],
//       declarations: [AdminMentorComponent],
//       providers: [
//         {
//           provide: CourseDataService,
//           useValue: mockCourseDataService,
//         },
//       ],
//     });
//     fixture = TestBed.createComponent(AdminMentorComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should fetch mentor earnings on ngOnInit', () => {
//     expect(mockCourseDataService.fetchMentorEarning).toHaveBeenCalled();
//   });

//   it('should update mentorEarnings with fetched data', () => {
//     fixture.detectChanges();
//     expect(component.mentorEarnings).toEqual(mockEarnings);
//   });

//   // it('should update mentorEarnings with fetched data', () => {
//   //   const mockEarnings = [{ name: 'John Doe', earnings: 100 }];
//   //   courseDataServiceSpy.fetchMentorEarning.and.returnValue(of(mockEarnings));
//   //   fixture.detectChanges();
//   //   expect(component.mentorEarnings).toEqual(mockEarnings);
//   // });

//   // it('should add mentor when add mentor button is clicked', () => {
//   //   // mockCourseDataService.addMentor()
//   //   component.mentorName = 'testuser10';
//   //   component.onButtonClicked();
//   //   expect(component.onButtonClicked).toHaveBeenCalledTimes(1);
//   // });

//   // it('should call addMentor service when button is clicked', () => {
//   //   component.mentorName = 'Jane Smith';
//   //   component.onButtonClicked();
//   //   expect(mockCourseDataService.addMentor).toHaveBeenCalledWith('Jane Smith');
//   // });

//   it('should call addMentor service when button is clicked', () => {
//     const mockMentor = 'Jane Smith';
//     component.mentorName = mockMentor;

//     // Assuming addMentor returns an Observable
//     mockCourseDataService.addMentor(mockMentor);

//     component.onButtonClicked();
//     fixture.detectChanges(); // Trigger change detection if needed

//     expect(mockCourseDataService.addMentor).toHaveBeenCalledTimes(1);
//   });
// });
