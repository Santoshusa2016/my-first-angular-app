import { Component, OnInit } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ReceipeService } from "src/app/receipes/receipe.service";
import { Receipe } from "../receipe.model";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup; //sec16

  constructor(
    private route: ActivatedRoute,
    private recipeSvc: ReceipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params["id"]; //+ to convert string to number
      this.editMode = params["id"] != null;

      //sec16: 228
      //call the form whenever recipeID changes to reload form
      this.initForm();
    });
  }

  //sec16:228
  private initForm() {
    let recipeName = "";
    let recipeImage = "";
    let recipeDesc = "";
    let recipeIngredients = new FormArray([]); // sect16:231 - initialized with default empty array
    console.log("recipe-edit:initForm:" + this.editMode);

    if (this.editMode) {
      const recipe = this.recipeSvc.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDesc = recipe.description;

      if (recipe["ingredients"]) {
        for (let ingredient of recipe["ingredients"]) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern("^[1-9]+[0-9]*$"),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      //register controls using JS Object
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  //sec16:229,234
  onSubmit() {
    //no need to pass local form object like we did in template driven approach
    console.log(this.recipeForm);
    const recipe = new Receipe(
      this.recipeForm.value["name"],
      this.recipeForm.value["description"],
      this.recipeForm.value["imagePath"],
      this.recipeForm.value["ingredients"]
    );

    //instead of above formulated recipe since we can also pass form provided object props have same name as required obj
    if (this.editMode) {
      this.recipeSvc.updateRecipe(this.id, recipe);
    } else this.recipeSvc.addRecipe(this.recipeForm.value);

    this.onCancel();
  }

  get controls() {
    // a getter!
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  onAddIngredient() {
    //sect16:232 - onclick of button new control is been added.
    //explicit cast the control to FormArray
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern("^[1-9]+[0-9]*$"),
        ]),
      })
    );
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  //sect16:239
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }
}
