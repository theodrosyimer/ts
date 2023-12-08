/* dailyFoodIntakeCurrent,  */
import { dailyFoodIntakeAdjusted } from './nutritionDailyFoodIntake.js'

export interface ItemNutritionalProps {
  calories: number
  carbohydrates: number
  protein: number
  sugar: number
  fat: number
}

export interface ItemVolumeProps {
  per100Grams: boolean
  quantity: number | number[]
  frequency: number
}

export type ItemProps = ItemNutritionalProps & ItemVolumeProps

export type FoodItemProps = {
  [key: string]: ItemProps
}

export type FoodItems = {
  [key: string]: FoodItemProps[]
}

const calculateDailyIntake =
  (prop: keyof ItemNutritionalProps) => (foodIntake: ItemProps) => {
    const {
      calories,
      carbohydrates,
      protein,
      sugar,
      fat,
      per100Grams,
      quantity,
      frequency,
    } = foodIntake

    let _quantity = 0
    let _frequency = frequency

    if (typeof quantity === 'number') {
      _quantity = quantity
    }

    if (Array.isArray(quantity)) {
      _quantity = quantity.reduce((acc, value) => acc + value, 0)

      _frequency = 1
    }

    if (per100Grams === true) _quantity /= 100

    if (prop === 'protein') return protein * _quantity * _frequency
    if (prop === 'carbohydrates') return carbohydrates * _quantity * _frequency
    if (prop === 'sugar') return sugar * _quantity * _frequency
    if (prop === 'fat') return fat * _quantity * _frequency

    return calories * _quantity * _frequency
  }

const calculateDailyIntakeOfCalories = calculateDailyIntake('calories')
const calculateDailyIntakeOfProtein = calculateDailyIntake('protein')
const calculateDailyIntakeOfCarbohydrates =
  calculateDailyIntake('carbohydrates')
const calculateDailyIntakeOfSugar = calculateDailyIntake('sugar')
const calculateDailyIntakeOfFat = calculateDailyIntake('fat')

export const calculateDailyFoodIntake = (dailyFood: FoodItemProps) => {
  let dailyCaloriesIntake = 0
  let dailyProteinIntake = 0
  let dailyCarbohydratesIntake = 0
  let dailySugarIntake = 0
  let dailyFatIntake = 0

  Object.entries(dailyFood).forEach((foodItem) => {
    dailyCaloriesIntake += calculateDailyIntakeOfCalories(foodItem[1])
    dailyProteinIntake += calculateDailyIntakeOfProtein(foodItem[1])
    dailyCarbohydratesIntake += calculateDailyIntakeOfCarbohydrates(foodItem[1])
    dailySugarIntake += calculateDailyIntakeOfSugar(foodItem[1])
    dailyFatIntake += calculateDailyIntakeOfFat(foodItem[1])
  })

  return {
    dailyCaloriesIntake,
    dailyProteinIntake,
    dailyCarbohydratesIntake,
    dailySugarIntake,
    dailyFatIntake,
  }
}

// calculateDailyFoodIntake(dailyFoodIntakeCurrent) /*?*/
calculateDailyFoodIntake(dailyFoodIntakeAdjusted) /*? */
