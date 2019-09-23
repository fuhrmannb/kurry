import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import {
  Grid,
  IconButton,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  Button,
  TextField as TextFieldOrig,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
} from "@material-ui/core"
import ClearIcon from "@material-ui/icons/Clear"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import PersonIcon from "@material-ui/icons/Person"
import { SortableElement, SortableContainer } from "react-sortable-hoc"
import { AppState } from "app/appState"
import {
  Recipe,
  RecipeIngredient,
  newRecipe,
  newIngredient,
  getIngredientInfo,
  RecipeIngredientFoodDB,
  RecipeIngredientCustom,
} from "recipe/recipeModel"
import { connect } from "react-redux"
import { Formik, Form, FieldArray, Field, FieldProps } from "formik"
import { TextField } from "formik-material-ui"
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
import DragHandleIcon from "@material-ui/icons/DragHandle"
import Autocomplete from "@material-ui/lab/Autocomplete"
import FoodDB, { Ingredient, Units } from "recipe/fooddb/fooddb.gen"
import defaultIngredientImage from "recipe/resources/defaultIngredient.svg"

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
    stepNumber: {
      marginLeft: theme.spacing(-0.6),
    },
    stepField: {
      marginLeft: theme.spacing(-3),
      marginTop: theme.spacing(1.2),
      marginBottom: theme.spacing(-1),
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
  })
)

const IngredientHandle = SortableHandle(() => {
  const classes = useStyles()

  return <DragHandleIcon className={classes.ingredientDragHandle} />
})

const IngredientAutocomplete = (props: FieldProps) => {
  const ingredientInfo = getIngredientInfo({
    spec: props.field.value,
  } as RecipeIngredient)
  return (
    <Autocomplete<Ingredient | string>
      autoSelect
      freeSolo
      options={Object.values(FoodDB.ingredients).sort((a, b) => {
        // TODO: manage i18n
        // TODO: manage multiple categories or only first?
        let catA = FoodDB.categories[a.categories[0]].name.fr || ""
        let catB = FoodDB.categories[b.categories[0]].name.fr || ""
        if (catA !== catB) {
          return catA.localeCompare(catB)
        }
        return a.name.fr.localeCompare(b.name.fr)
      })}
      getOptionLabel={(option) => {
        if (option && typeof option !== "string") {
          // TODO: manage i18n
          return option.name.fr || ""
        }
        return option
      }}
      groupBy={(option) => {
        if (option && typeof option !== "string") {
          // TODO: manage multiple categories or only first?
          let cat = FoodDB.categories[option.categories[0]]
          // TODO: manage i18n
          return cat.name.fr || ""
        }
        return ""
      }}
      value={ingredientInfo.name}
      renderInput={(params) => {
        return (
          <TextFieldOrig
            {...params}
            margin="normal"
            label="Name"
            fullWidth
            required
          />
        )
      }}
      onChange={(
        _: React.ChangeEvent<{}>,
        value: Ingredient | string | null
      ) => {
        if (value && typeof value !== "string") {
          props.form.setFieldValue(props.field.name, {
            type: "fooddb",
            ref: value.id,
          } as RecipeIngredientFoodDB)
        } else {
          props.form.setFieldValue(props.field.name, {
            type: "custom",
            name: value,
          } as RecipeIngredientCustom)
        }
      }}
    />
  )
}

export const IngredientEditCard = SortableElement(
  (item: {
    ingredient: RecipeIngredient
    sortIndex: number
    remove: ItemRemoveFunction
  }) => {
    const classes = useStyles()
    const info = getIngredientInfo(item.ingredient)
    return (
      <Grid item xs={6} sm={4} lg={3} xl={2}>
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
            image={info.img || defaultIngredientImage}
            title={info.name}
          />
          <CardContent>
            <Field
              name={`ingredients[${item.sortIndex}].spec`}
              required
              component={IngredientAutocomplete}
            />
            <Field
              name={`ingredients[${item.sortIndex}].amount`}
              label="Amount"
              component={TextField}
              type="number"
              className={classes.amountField}
            />
            <Field
              name={`ingredients[${item.sortIndex}].unit`}
              component={TextField}
              select
              label="Unit"
              SelectProps={{
                native: true,
              }}
            >
              {info.availableUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
              {Units.filter((e) => !info.availableUnits.includes(e)).map(
                (unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                )
              )}
            </Field>
          </CardContent>
        </Card>
      </Grid>
    )
  }
)

const IngredientGrid = SortableContainer(
  (items: { ingredients: RecipeIngredient[]; remove: ArrayRemoveFunction }) => {
    const classes = useStyles()
    return (
      <Grid container spacing={2} className={classes.block}>
        {items.ingredients.map((ingredient, index) => {
          return (
            <IngredientEditCard
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
        <Field
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
      const recipe = await produce(values, async (draft) => {
        if (imgPreviewURL !== draft.img) {
          const path = `/recipes/${draft.id}/img`

          // Upload new image if any
          if (imgFile) {
            // FIXME: maybe use previous code with uploadFile when metadata feature will be available
            const storageRef = props.firebase.storage().ref()
            const uploadedFile = await storageRef.child(path).put(imgFile, {
              customMetadata: { uid: props.uid },
            })

            draft.img = await uploadedFile.ref.getDownloadURL()
          } else {
            // Remove previous image
            await props.firebase.deleteFile(path)
            draft.img = ""
          }
        }
      })

      // Need to wait response, otherwise react-redux-firebase listener is unset
      // before data is updated in Redux state
      await props.firestore.set(
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
    <Formik initialValues={props.recipe} onSubmit={onSubmit}>
      {({ values }) => (
        <Form>
          <Grid container>
            <Grid item xs={6} sm={7} md={8} lg={9} xl={10}>
              <Field
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
                      <Field
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
                      <Field
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
            className={classes.block}
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
          <FieldArray name="ingredients">
            {(arrayHelpers) => (
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
          </FieldArray>
          <FieldArray name="steps">
            {(arrayHelpers) => (
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
          </FieldArray>
          <Field
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
    </Formik>
  )
}

function mapStateToProps(
  state: AppState,
  router: RouteComponentProps<{ id: string }>
) {
  const id = router.match.params.id
  const uid = state.firebase.auth.uid

  const dbRecipe =
    state.firestore.data.recipes && state.firestore.data.recipes[id]
  const loading = !isLoaded(dbRecipe)
  const recipe = isEmpty(dbRecipe) ? newRecipe(id, uid) : (dbRecipe as Recipe)

  return {
    id: router.match.params.id,
    uid: uid,
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
        doc: props.id,
      },
    ]
  })
)(RecipeEditor)
