import { ADD_TO_CART, CHANGE_ITEM_POSITION, CLEAR_CART, REMOVE_FROM_CART } from "../constatns/actionTypes";
import { TIngredient } from "../../types/data";

export interface IAddToCartAction {
  readonly type: typeof ADD_TO_CART;
  readonly item: TIngredient
}

export interface IRemoveFromCartAction {
  readonly type: typeof REMOVE_FROM_CART;
  readonly key: string
}

export interface IChangeItemPositionAction {
  readonly type: typeof CHANGE_ITEM_POSITION;
  readonly oldIndex: number;
  readonly newIndex: number
}

export interface IClearCartAction {
  readonly type: typeof CLEAR_CART;
}

export type TCartActions = IAddToCartAction | IRemoveFromCartAction | IChangeItemPositionAction | IClearCartAction

export const addToCartAction = (item: TIngredient): IAddToCartAction => ({ type: ADD_TO_CART, item })
export const removeFromCartAction = (key: string): IRemoveFromCartAction => ({ type: REMOVE_FROM_CART, key })
export const changeItemPositionAction = (oldIndex: number, newIndex: number): IChangeItemPositionAction => ({ type: CHANGE_ITEM_POSITION, oldIndex, newIndex })
export const clearCartAction = (): IClearCartAction => ({ type: CLEAR_CART })