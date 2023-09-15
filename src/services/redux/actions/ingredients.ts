import { getIngredients as getIngredientsRequest } from "../../../utils/burger-api";
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, SHOW_INGREDIENT_DATA } from "../constatns/actionTypes";
import { AppDispatch, AppThunk } from "../../types/redux";
import { TIngredient } from "../../types/data";

interface IGetIngredientsRequestAction {
  type: typeof GET_INGREDIENTS_REQUEST
}

interface IGetIngredientsSuccessAction {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: ReadonlyArray<TIngredient>
}

interface IGetIngredientsFailedAction {
  type: typeof GET_INGREDIENTS_FAILED
}

interface IShowIngredientDataAction {
  type: typeof SHOW_INGREDIENT_DATA;
  currentIngredient: TIngredient
}

export const getIngredientsRequestAction = (): IGetIngredientsRequestAction => ({ type: GET_INGREDIENTS_REQUEST })
export const getIngredientsSuccessAction = (ingredients: ReadonlyArray<TIngredient>): IGetIngredientsSuccessAction => ({ type: GET_INGREDIENTS_SUCCESS, ingredients })
export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({ type: GET_INGREDIENTS_FAILED })
export const showIngredientData = (currentIngredient: TIngredient): IShowIngredientDataAction => ({ type: SHOW_INGREDIENT_DATA, currentIngredient })

export type TIngredientsActions = IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsFailedAction
  | IShowIngredientDataAction

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequestAction())
  getIngredientsRequest()
    .then((res) => {
      if (res && res.success) {
        dispatch(getIngredientsSuccessAction(res.data));
      } else {
        dispatch(getIngredientsFailedAction());
      }
    })
    .catch(e => dispatch(getIngredientsFailedAction()))
};