import { UserProperty } from "app/model";

export type Recipe = UserProperty & {
  id: string
  title: string
  img: string
  tags: string[]
  time: number
  servings: number
  ingredients: Ingredient[]
  steps: string[]
  notes: string
}
export type Ingredient = { img: string; name: string; amount?: number; unit?: string }

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
    img: "",
    name: "",
  } as Ingredient
)
