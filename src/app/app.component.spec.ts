import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should create the app", async () => {
    await waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  });

  it(`should have as title 'app'`, async () => {
    await waitForAsync(() => {
      component = fixture.debugElement.componentInstance;
      component.name = "My App";
    });
    expect(component.name).toEqual("My App");
  });

  it("should render title in a h1 tag", waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); // this helps in rendering the obj ect
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("h1").textContent).toContain(
      "Welcome to app!"
    );
  }));
});
