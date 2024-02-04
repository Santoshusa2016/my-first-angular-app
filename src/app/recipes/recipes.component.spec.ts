import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReceipesComponent } from './recipes.component';
import { RecipeService } from './recipe.service';

describe('test recipe component', () => {
  let component: ReceipesComponent;
  let fixture: ComponentFixture<ReceipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReceipesComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should work with service', async () => {
    await waitForAsync(() => {
      let recipeService = fixture.debugElement.injector.get(RecipeService);
      fixture.detectChanges();
      expect(recipeService.getReceipes()).toEqual([]);
    });
  });

  it('should display username if logged in', async () => {
    await waitForAsync(() => {
      let recipeService = fixture.debugElement.injector.get(RecipeService);
      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('p').textContent).toContain('Santosh');
    });
  });
});
