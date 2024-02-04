import { createReducer, Action, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import {
  AddIngredient,
  AddIngredients,
  ShoppingListActions,
} from '../store/shopping-list.action';

//sect26:398
export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

export interface AppState {
  shoppingList: State;
}

const initialState: State = {
  ingredients: [
    new Ingredient('apple', 5),
    new Ingredient('mango', 5),
    new Ingredient('banana', 5),
  ],
  //sect26:398
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const ShoppingListReducer = createReducer(
  initialState,
  on(AddIngredient, (currentState, action) => {
    return {
      ...currentState,
      ingredients: [...currentState.ingredients, action.payload],
    };
  })
);

export function shoppingListReducerFunc(
  state: State = initialState,
  action: ShoppingListActions
) {
  switch (action.type) {
    case 'ADD_INGREDIENT':
      return {
        ...state, //always copy all the old state and then modifiy individual props
        ingredients: [...state.ingredients, action.payload],
      };
    case 'ADD_INGREDIENTS':
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case 'UPDATE_INGREDIENTS':
      const ingredient = state.ingredients[action.payload.index];
      //create new updated ingredient object
      const updIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
      };
    case 'DELETE_INGREDIENTS':
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== action.payload;
        }),
      };
    default:
      return state;
  }
}
