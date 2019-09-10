export type Recipe = {
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

export const newRecipe = (id: string = "") => (
  {
    id: id,
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
