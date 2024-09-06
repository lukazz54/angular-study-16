import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {TestBed.configureTestingModule({
    imports: [AppComponent]
  }),
   fixture = TestBed.createComponent(AppComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  //teste do @Input
  it('should set @Imput property correctly', () => {
     component.projectName = 'Testing Angular with Jest';

     fixture.detectChanges();

     expect(component.projectName).toEqual('Testing Angular with Jest')
  });

  //teste @Output e @Input
  it('should emit event with @Output decorator correctly', () =>{
     component.projectName = 'Testing my Angular application';

     component.outputEvent.pipe(
      first()
     ).subscribe({
      next: (event) => {
        expect(event).toEqual('Testing my Angular application');
        component.handleEmitEvent()
      }
     })
  })
});
