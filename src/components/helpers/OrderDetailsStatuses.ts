import { TOrderStatusColors, TOrderStatusTexts } from "../../services/types/data";

export const statusTypes = {
  created: 'created',
  pending: 'pending',
  done: 'done'
}

export const orderStatusColors: TOrderStatusColors = {
  created: '#F2F2F3',
  pending: '#F2F2F3',
  done: '#0CC',
}

export const orderStatusTexts: TOrderStatusTexts = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен'
}