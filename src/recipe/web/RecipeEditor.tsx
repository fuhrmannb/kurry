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
import {
  Recipe,
  Ingredient,
  newRecipe,
  newIngredient,
} from "recipe/recipeModel"
import { connect } from "react-redux"
import { Formik, Form, FastField, FieldArray, Field } from "formik"
import { TextField, Select } from "formik-material-ui"
import { ChipInput } from "material-ui-formik-components/ChipInput"
import { SortableHandle } from "react-sortable-hoc"
import {
  firestoreConnect,
  WithFirestoreProps,
  isEmpty,
  isLoaded,
} from "react-redux-firebase"
import { compose } from "redux"
import ImageUploader from "recipe/web/ImageUploader"
import produce from "immer"

type ArrayRemoveFunction = (index: number) => void
type ItemRemoveFunction = () => void

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageUploader: {
      marginTop: theme.spacing(1),
    },
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
    ingredient: Ingredient
    sortIndex: number
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
            //TODO: manage image upload with Firebase Storage
            image={item.ingredient.img}
            title={item.ingredient.name}
          />
          <CardContent>
            <FastField
              name={`ingredients[${item.sortIndex}].name`}
              label="Name"
              component={TextField}
              fullWidth
              required
            />
            <FastField
              name={`ingredients[${item.sortIndex}].amount`}
              label="Amount"
              component={TextField}
              type="number"
              className={classes.amountField}
            />
            <FormControl>
              <InputLabel
                shrink
                htmlFor={`ingredientUnitPlacehoder${item.sortIndex}`}
              >
                Unit
              </InputLabel>
              <FastField
                name={`ingredients[${item.sortIndex}].unit`}
                component={Select}
                native
                input={
                  <Input
                    name="unit"
                    id={`ingredientUnitPlacehoder${item.sortIndex}`}
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
  (items: { ingredients: Ingredient[]; remove: ArrayRemoveFunction }) => {
    const classes = useStyles()
    return (
      <Grid container spacing={2} className={classes.block}>
        {items.ingredients.map((ingredient, index) => {
          return (
            <IngredientItem
              key={`ingredient-${index}`}
              index={index} // Consumed by SortableElement, cannot be reused
              sortIndex={index}
              ingredient={ingredient}
              remove={() => {
                items.remove(index)
              }}
            />
          )
        })}
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
  (item: { step: string; sortIndex: number; remove: ItemRemoveFunction }) => {
    const classes = useStyles()
    return (
      <ListItem alignItems="flex-start">
        <StepHandle index={item.sortIndex} />
        <FastField
          name={`steps[${item.sortIndex}]`}
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
            index={index} // Consumed by SortableElement, cannot be reused
            sortIndex={index}
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
  props: ReturnType<typeof mapStateToProps> & WithFirestoreProps
) {
  const classes = useStyles()

  const [imgFile, setImgFile] = useState<File>()
  const [imgPreviewURL, setImgPreviewURL] = useState(props.recipe.img)

  // TODO: Better UI integration
  // TODO: manage out-of-sync data + reload feature?
  if (props.isLoading) {
    return <div>Loading...</div>
  }

  const onSubmit = async (values: Recipe) => {
    try {
      // Check if image has changed (the preview is not the same)
      const recipe = await produce(props.recipe, async draft => {
        if (imgPreviewURL !== draft.img) {
          const path = `recipes/${draft.id}`

          // Upload new image if any
          if (imgFile) {
            // Note: Typescript return type is currently wrong, issue #762 submitted on react-redux-firebase
            const uploadedFile = (await props.firebase.uploadFile(
              path,
              imgFile,
              undefined, // Don't want custom metadata path
              {
                name: "img",
              }
            )) as any
            draft.img = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL()
          } else {
            // Remove previous image
            await props.firebase.deleteFile(`${path}/img`)
            draft.img = ""
          }
        }
      })

      props.firestore.set(
        {
          collection: "recipes",
          doc: recipe.id,
        },
        recipe
      )
      props.router.history.push(`../${recipe.id}`)
    } catch (error) {
      // TODO: manage error correctly (notification?)
      // Also manage upload in progress view? (use Redux actions?)
      console.error(error)
    }
  }

  return (
    <Formik
      initialValues={props.recipe}
      onSubmit={onSubmit}
      render={({ values }) => (
        <Form>
          <Grid container>
            <Grid item xs={6} sm={7} md={8} lg={9} xl={10}>
              <FastField
                name="title"
                label="Title"
                component={TextField}
                fullWidth
                required
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
          <ImageUploader
            title="Recipe illustration"
            onImageUpload={(file, previewURL) => {
              setImgFile(file)
              setImgPreviewURL(previewURL)
            }}
            initialImageURL={props.recipe.img}
            className={classes.imageUploader}
          />
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
                  color="default"
                  className={classes.block}
                  onClick={() => arrayHelpers.push(newIngredient())}
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
                  color="default"
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
  router: RouteComponentProps<{ id: string }>
) {
  const id = router.match.params.id
  const recipes = state.firestore.data["recipes/" + id]

  let recipe: Recipe
  let loading = !isLoaded(recipes)
  if (isEmpty(recipes)) {
    recipe = newRecipe(id)
  } else {
    recipe = recipes[id]
  }

  return {
    id: router.match.params.id,
    isLoading: loading,
    recipe: recipe,
    router: router,
  }
}
export default compose<React.ComponentType>(
  connect(mapStateToProps),
  firestoreConnect((props: ReturnType<typeof mapStateToProps>) => {
    if (!props.id) {
      return []
    }
    return [
      {
        collection: "recipes",
        where: [["id", "==", props.id]],
        // Need a dedicated variable for each edition
        // Otherwise, use the same request as RecipeList
        storeAs: "recipes/" + props.id,
      },
    ]
  })
)(RecipeEditor)
