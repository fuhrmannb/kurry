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
  TextField,
  Select,
} from "@material-ui/core"
import ChipInput from "material-ui-chip-input"
import ClearIcon from "@material-ui/icons/Clear"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import PersonIcon from "@material-ui/icons/Person"
import { SortableElement, SortableContainer } from "react-sortable-hoc"
import { AppState } from "app/appState"
import { IngredientState, updateRecipe, RecipeState } from "recipe/recipeState"
import { connect } from "react-redux"
import arrayMove from "array-move"
import produce from "immer"

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
      marginTop: -75,
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

const IngredientItem = SortableElement(
  (item: {
    ingredient: IngredientState
    index: number
    state: RecipeEditorState
  }) => {
    const classes = useStyles()
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
        <Card>
          <CardHeader
            action={
              <IconButton
                aria-label="delete"
                onClick={() =>
                  item.state.setValues(
                    produce(item.state.values, draft => {
                      draft.ingredients.push({} as IngredientState)
                    })
                  )
                }
              >
                <ClearIcon />
              </IconButton>
            }
          />
          {/* <CardMedia
            className={classes.ingredientMedia}
            image={item.ingredient.img}
            title={item.ingredient.name}
          /> */}
          <CardContent>
            <TextField
              name={`ingredients[${item.index}].name`}
              label="Name"
              fullWidth
              required
              value={item.ingredient.name}
              onChange={event =>
                item.state.setValues(
                  produce(item.state.values, draft => {
                    draft.ingredients[item.index].name = event.target.value
                  })
                )
              }
            />
            <TextField
              name={`ingredients[${item.index}].amount`}
              label="Amount"
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
              <Select
                name={`ingredients[${item.index}].unit`}
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
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    )
  }
)

const IngredientGrid = SortableContainer(
  (items: { ingredients: IngredientState[]; state: RecipeEditorState }) => {
    const classes = useStyles()
    return (
      <Grid container spacing={2} className={classes.block}>
        {items.ingredients.map((ingredient, index) => (
          <IngredientItem
            key={`ingredient-${index}`}
            index={index}
            ingredient={ingredient}
            state={items.state}
          />
        ))}
      </Grid>
    )
  }
)

const StepItem = SortableElement(
  (item: { step: string; index: number; state: RecipeEditorState }) => {
    const classes = useStyles()
    return (
      <ListItem alignItems="flex-start">
        <ListItemIcon>
          <Chip
            className={classes.stepNumber}
            size="small"
            color="primary"
            label={item.index + 1}
          />
        </ListItemIcon>
        <TextField
          name={`steps[${item.index}]`}
          label="Step"
          className={classes.stepField}
          placeholder="Type here your step instruction"
          multiline
          fullWidth
        />
      </ListItem>
    )
  }
)

const StepList = SortableContainer(
  (items: { steps: string[]; state: RecipeEditorState }) => {
    const classes = useStyles()
    return (
      <List className={classes.block}>
        {items.steps.map((step, index) => (
          <StepItem
            key={`step-${index}`}
            index={index}
            step={step}
            state={items.state}
          />
        ))}
      </List>
    )
  }
)

type RecipeEditorState = {
  values: RecipeState
  setValues: React.Dispatch<
    React.SetStateAction<{
      ingredients: IngredientState[]
      steps: string[]
    }>
  >
}
function RecipeEditor(
  props: ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps
) {
  const classes = useStyles()

  const [_v, _sV] = useState({
    ingredients: props.recipe.ingredients,
    steps: props.recipe.steps,
  })
  const state: RecipeEditorState = {
    values: { ...props.recipe, ..._v },
    setValues: _sV,
  }

  return (
    <form>
      <Grid container>
        <Grid item xs={6} sm={7} md={8} lg={9} xl={10}>
          <TextField name="title" label="Title" fullWidth />
        </Grid>
        <Grid item xs={6} sm={5} md={4} lg={3} xl={2}>
          <Grid container justify="flex-end" spacing={1}>
            <Grid item>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid item>
                  <PersonIcon />
                </Grid>
                <Grid item>
                  <TextField
                    defaultValue={state.values.servings}
                    label="Serving"
                    className={classes.servingField}
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
                  <TextField
                    defaultValue={state.values.time}
                    label="Time"
                    className={classes.timeField}
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ChipInput
        className={classes.block}
        value={state.values.tags}
        fullWidth
        label="Tags"
        placeholder="Type and press enter to add recipe tags"
        newChipKeyCodes={[13, 32, 188, 190]}
      />
      <IngredientGrid
        axis="xy"
        ingredients={state.values.ingredients}
        onSortEnd={({ oldIndex, newIndex }) => {
          state.setValues(
            produce(state.values, draft => {
              draft.ingredients = arrayMove(
                draft.ingredients,
                oldIndex,
                newIndex
              )
            })
          )
        }}
        state={state}
      />
      <Button
        variant="contained"
        color="secondary"
        className={classes.block}
        onClick={() => {
          state.setValues(
            produce(state.values, draft => {
              draft.ingredients.push({} as IngredientState)
            })
          )
        }}
      >
        Add ingredient
      </Button>
      <StepList
        axis="y"
        steps={state.values.steps}
        onSortEnd={({ oldIndex, newIndex }) => {
          state.setValues(
            produce(state.values, draft => {
              draft.steps = arrayMove(draft.steps, oldIndex, newIndex)
            })
          )
        }}
        state={state}
      />
      <Button
        variant="contained"
        color="secondary"
        className={classes.block}
        onClick={() => {
          state.setValues(
            produce(state.values, draft => {
              draft.steps.push("")
            })
          )
        }}
      >
        Add step
      </Button>
      <TextField
        defaultValue={state.values.notes}
        label="Notes"
        className={classes.block}
        multiline
        fullWidth
      />
    </form>
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
