import React from "react"

import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import { RecipeState } from "recipe/recipeState"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"

export default function RecipeDeleteDialog(props: {
  open: boolean
  recipe: RecipeState
  onAgree: () => void
  onCancel: () => void
}) {
  return (
    <Dialog
      onClose={props.onCancel}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogTitle>Delete recipe "{props.recipe.title}"</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure to delete this recipe?<br />
          This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={props.onAgree} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}
