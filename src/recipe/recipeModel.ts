import { UserProperty } from "app/model"
import FoodDB, { Unit, Units } from "./fooddb/fooddb.gen"

export type Recipe = UserProperty & {
  id: string
  title: string
  img: string
  tags: string[]
  time: number
  servings: number
  ingredients: RecipeIngredient[]
  steps: string[]
  notes: string
}

export type RecipeIngredient = {
  spec: RecipeIngredientFoodDB | RecipeIngredientCustom
  amount?: number
  unit?: Unit
}
export type RecipeIngredientSpec = {
  type: string
}
export type RecipeIngredientFoodDB = RecipeIngredientSpec & {
  type: "fooddb"
  ref: string
}
export type RecipeIngredientCustom = RecipeIngredientSpec & {
  type: "custom"
  name: string
}

export type RecipeIngredientInfo = {
  name: string
  img?: string
  amount?: number
  availableUnits: Unit[]
  unit?: Unit
}

export function getIngredientInfo(ing: RecipeIngredient): RecipeIngredientInfo {
  let result: RecipeIngredientInfo = {
    name: "",
    availableUnits: [...Units],
    amount: ing.amount,
    unit: ing.unit
  }

  let spec = ing.spec
  switch (spec.type) {
    case "fooddb":
      let db = FoodDB.ingredients[spec.ref]
      // TODO: mange i18n
      result.name = db.name.fr
      result.img = db.img
      result.availableUnits = db.units
      break
    case "custom":
      result.name = spec.name
      break
  }
  return result
}

export const newRecipe = (id: string = "", uid: string= "") => (
  {
    id: id,
    uid: uid,
    title: "",
    img: "",
    tags: [],
    time: 0,
    servings: 0,
    ingredients: [],
    steps: [],
    notes: "",
  } as Recipe
)

export const newIngredient = () => (
  {
    spec: {name: ""},
  } as RecipeIngredient
)
