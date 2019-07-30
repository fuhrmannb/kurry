import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import {
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Input,
  CardMedia,
  CardHeader,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  Button,
} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import PersonIcon from "@material-ui/icons/Person"
import DragHandleIcon from "@material-ui/icons/DragHandle"
import { SortableElement, SortableContainer } from "react-sortable-hoc"
import { AppState } from "app/appState"
import { IngredientState, updateRecipe } from "recipe/recipeState"
import { connect } from "react-redux"
import { Formik, Form, FastField, FieldArray, Field } from "formik"
import { TextField, Select } from "formik-material-ui"
import { ChipInput } from "material-ui-formik-components/ChipInput"
import { SortableHandle } from "react-sortable-hoc"

type ArrayRemoveFunction = (index: number) => void
type ItemRemoveFunction = () => void

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    servingField: {
      maxWidth: 50,
    },
    timeField: {
      maxWidth: 50,
    },
    block: {
      marginTop: theme.spacing(2),
    },
    ingredientMedia: {
      height: 0,
      paddingTop: "56.25%", // 16:9
      marginTop: -14,
    },
    ingredientRemoveButton: {
      marginTop: -6,
    },
    ingredientDragHandle: {
      position: "absolute",
      cursor: "move",
      marginTop: 4,
      width: 45,
    },
    amountField: {
      maxWidth: 55,
    },
    stepNumber: {
      marginLeft: theme.spacing(-0.6),
    },
    stepField: {
      marginLeft: theme.spacing(-3),
      marginTop: theme.spacing(1.2),
      marginBottom: theme.spacing(-1),
    },
  })
)

const IngredientHandle = SortableHandle(() => {
  const classes = useStyles()

  return <DragHandleIcon className={classes.ingredientDragHandle} />
})

const IngredientItem = SortableElement(
  (item: {
    ingredient: IngredientState
    index: number
    remove: ItemRemoveFunction
  }) => {
    const classes = useStyles()
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
        <Card>
          <IngredientHandle />
          <CardHeader
            action={
              <IconButton
                size="small"
                aria-label="delete"
                className={classes.ingredientRemoveButton}
                onClick={() => {
                  item.remove()
                }}
              >
                <ClearIcon />
              </IconButton>
            }
          />
          <CardMedia
            className={classes.ingredientMedia}
            image={item.ingredient.img}
            title={item.ingredient.name}
          />
          <CardContent>
            <FastField
              name={`ingredients[${item.index}].name`}
              label="Name"
              component={TextField}
              fullWidth
              required
            />
            <FastField
              name={`ingredients[${item.index}].amount`}
              label="Amount"
              component={TextField}
              type="number"
              className={classes.amountField}
            />
            <FormControl>
              <InputLabel
                shrink
                htmlFor={`ingredientUnitPlacehoder${item.index}`}
              >
                Unit
              </InputLabel>
              <FastField
                name={`ingredients[${item.index}].unit`}
                component={Select}
                native
                input={
                  <Input
                    name="unit"
                    id={`ingredientUnitPlacehoder${item.index}`}
                  />
                }
              >
                <option value="">Each</option>
                <option value="g">g</option>
                <option value="Kg">Kg</option>
                <option value="cL">cL</option>
                <option value="L">L</option>
              </FastField>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    )
  }
)

const IngredientGrid = SortableContainer(
  (items: { ingredients: IngredientState[]; remove: ArrayRemoveFunction }) => {
    const classes = useStyles()
    return (
      <Grid container spacing={2} className={classes.block}>
        {items.ingredients.map((ingredient, index) => (
          <IngredientItem
            key={`ingredient-${index}`}
            index={index}
            ingredient={ingredient}
            remove={() => {
              items.remove(index)
            }}
          />
        ))}
      </Grid>
    )
  }
)

const StepHandle = SortableHandle((item: { index: number }) => {
  const classes = useStyles()

  return (
    <ListItemIcon>
      <Chip
        className={classes.stepNumber}
        size="small"
        color="primary"
        label={item.index + 1}
      />
    </ListItemIcon>
  )
})

const StepItem = SortableElement(
  (item: { step: string; index: number; remove: ItemRemoveFunction }) => {
    const classes = useStyles()
    return (
      <ListItem alignItems="flex-start">
        <StepHandle index={item.index} />
        <FastField
          name={`steps[${item.index}]`}
          label="Step"
          className={classes.stepField}
          component={TextField}
          placeholder="Type here your step instruction"
          multiline
          fullWidth
        />
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            item.remove()
          }}
        >
          <ClearIcon />
        </IconButton>
      </ListItem>
    )
  }
)

const StepList = SortableContainer(
  (items: { steps: string[]; remove: ArrayRemoveFunction }) => {
    const classes = useStyles()
    return (
      <List className={classes.block}>
        {items.steps.map((step, index) => (
          <StepItem
            key={`step-${index}`}
            index={index}
            step={step}
            remove={() => {
              items.remove(index)
            }}
          />
        ))}
      </List>
    )
  }
)

function RecipeEditor(
  props: ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps
) {
  const classes = useStyles()

  return (
    <Formik
      initialValues={props.recipe}
      onSubmit={() => {
        // TODO
        alert("TODO")
      }}
      render={({ values }) => (
        <Form>
          <Grid container>
            <Grid item xs={6} sm={7} md={8} lg={9} xl={10}>
              <FastField
                name="title"
                label="Title"
                component={TextField}
                fullWidth
              />
            </Grid>
            <Grid item xs={6} sm={5} md={4} lg={3} xl={2}>
              <Grid container justify="flex-end" spacing={1}>
                <Grid item>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <PersonIcon />
                    </Grid>
                    <Grid item>
                      <FastField
                        name="servings"
                        label="Servings"
                        className={classes.servingField}
                        component={TextField}
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccessTimeIcon />
                    </Grid>
                    <Grid item>
                      <FastField
                        name="time"
                        label="Time"
                        className={classes.timeField}
                        component={TextField}
                        type="number"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Field
            name="tags"
            label="Tags"
            component={ChipInput}
            className={classes.block}
            value={values.tags}
            fullWidth
            placeholder="Type and press enter to add recipe tags"
            newChipKeyCodes={[13, 32, 188, 190]}
          />
          <FieldArray
            name="ingredients"
            render={arrayHelpers => (
              <React.Fragment>
                <IngredientGrid
                  useDragHandle
                  axis="xy"
                  ingredients={values.ingredients}
                  remove={(index: number) => {
                    arrayHelpers.remove(index)
                  }}
                  onSortEnd={({ oldIndex, newIndex }) => {
                    arrayHelpers.move(oldIndex, newIndex)
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.block}
                  onClick={() => arrayHelpers.push("")}
                >
                  Add ingredient
                </Button>
              </React.Fragment>
            )}
          />
          <FieldArray
            name="steps"
            render={arrayHelpers => (
              <React.Fragment>
                <StepList
                  axis="y"
                  steps={values.steps}
                  useDragHandle
                  remove={(index: number) => {
                    arrayHelpers.remove(index)
                  }}
                  onSortEnd={({ oldIndex, newIndex }) => {
                    arrayHelpers.move(oldIndex, newIndex)
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.block}
                  onClick={() => arrayHelpers.push("")}
                >
                  Add step
                </Button>
              </React.Fragment>
            )}
          />
          <FastField
            name="notes"
            label="Notes"
            className={classes.block}
            component={TextField}
            multiline
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.block}
          >
            Submit
          </Button>
        </Form>
      )}
    />
  )
}

function mapStateToProps(
  state: AppState,
  routerProps: RouteComponentProps<{ id: string }>
) {
  return {
    recipe: state.recipes.byId[routerProps.match.params.id],
  }
}
const mapDispatchToProps = {
  updateRecipe,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeEditor)
