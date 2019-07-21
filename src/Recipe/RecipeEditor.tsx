import React from "react"
import { RouteComponentProps } from "react-router-dom"

export default function RecipeEditor(
  props: RouteComponentProps<{ id: string }>
) {
  return <div>Edit "{props.match.params.id}"</div>
}
