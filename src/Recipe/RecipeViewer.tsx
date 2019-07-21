import React from "react"
import { RouteComponentProps } from "react-router-dom"

export default function RecipeViewer(
  props: RouteComponentProps<{ id: string }>
) {
  return <div>View "{props.match.params.id}"</div>
}
