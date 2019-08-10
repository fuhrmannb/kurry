import React from "react"

import { RouteComponentProps, Route, Switch } from "react-router"

import RecipeViewer from "./RecipeViewer"
import RecipeEditor from "./RecipeEditor"
import RecipeList from "./RecipeList"

export default function Recipe(props: RouteComponentProps) {
  return (
    <Switch>
      <Route exact path={`${props.match.path}/`} component={RecipeList} />
      <Route exact path={`${props.match.path}/:id`} component={RecipeViewer} />
      <Route
        exact
        path={`${props.match.path}/edit/:id`}
        component={RecipeEditor}
      />
    </Switch>
  )
}
