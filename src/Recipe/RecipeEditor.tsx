import React, { useState } from "react"
import { RouteComponentProps } from "react-router-dom"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import {
  TextField,
  Grid,
  Card,
  CardContent,
  FormControl,
  NativeSelect,
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
import ChipInput from "material-ui-chip-input"
import ClearIcon from "@material-ui/icons/Clear"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import PersonIcon from "@material-ui/icons/Person"
import { SortableElement, SortableContainer } from "react-sortable-hoc"
import arrayMove from "array-move"

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

const data = {
  title: "Quiche Lorraine",
  img: "quiche.jpeg",
  tags: ["entrée", "omnivore", "lorraine"],
  time: 45,
  servings: 4,
  ingredients: [
    {
      img: "/test/creme.jpeg",
      name: "Crème",
      amount: 20,
      unit: "cL",
    },
    {
      img: "/test/lardons.jpeg",
      name: "Lardons",
      amount: 200,
      unit: "g",
    },
    {
      img: "/test/beurre.jpeg",
      name: "Beurre",
      amount: 30,
      unit: "g",
    },
    {
      img: "/test/oeufs.jpeg",
      name: "Oeufs",
      amount: 3,
    },
    {
      img: "/test/sel.jpeg",
      name: "Sel",
    },
    {
      img: "/test/poivre.jpeg",
      name: "Poivre",
    },
  ],
  steps: [
    `Préchauffer le four à 180°C (thermostat 6).
    sdfdsf sdfdsf sdf dsf dsfdsfds fsdf dsfqd fqd fqsdfqdf qdsf
    sdfdsf qsdf qsdf qds fqdsf qsdfsdqf qdsfhgfdjh gjhgj
    sdfdsf gdfgs gsfdg sfdgsfd h`,
    "Etaler la pâte dans un moule, la piquer à la fourchette. Parsemer de copeaux de beurre.",
    "Faire rissoler les lardons à la poêle.",
    "Battre les oeufs, la crème fraîche et le lait.",
    "Ajouter les lardons.",
    "Assaisonner de sel, de poivre et de muscade.",
    "Verser sur la pâte.",
    "Cuire 45 à 50 min.",
    "C'est prêt, déguster!",
  ],
  notes: "Servir avec une bonne salade :)",
}

type Ingredient =
  | { img: string; name: string; amount: number; unit: string }
  | { img: string; name: string; amount: number; unit?: undefined }
  | { img: string; name: string; amount?: undefined; unit?: undefined }

const IngredientItem = SortableElement(
  (item: { ingredient: Ingredient; index: number }) => {
    const classes = useStyles()
    return (
      <Grid item xs={6} sm={4} md={3} lg={2} xl={1}>
        <Card>
          <CardHeader
            action={
              <IconButton aria-label="Settings">
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
            <TextField
              fullWidth
              required
              id={`ingredientName${item.index}`}
              label="Name"
              defaultValue={item.ingredient.name}
            />
            <TextField
              id={`ingredientAmount${item.index}`}
              label="Amount"
              defaultValue={item.ingredient.amount}
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
              <NativeSelect
                defaultValue={item.ingredient.unit}
                name={`ingredientUnit${item.index}`}
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
              </NativeSelect>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    )
  }
)

const IngredientGrid = SortableContainer(
  (items: { ingredients: Ingredient[] }) => {
    const classes = useStyles()
    return (
      <Grid container spacing={2} className={classes.block}>
        {items.ingredients.map((ingredient, index) => (
          <IngredientItem
            key={`ingredient-${index}`}
            index={index}
            ingredient={ingredient}
          />
        ))}
      </Grid>
    )
  }
)

const StepItem = SortableElement((item: { step: string; index: number }) => {
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
        id={`step${item.index}`}
        className={classes.stepField}
        label="Step"
        placeholder="Type here your step instruction"
        value={item.step}
        multiline
        fullWidth
      />
    </ListItem>
  )
})

const StepList = SortableContainer((items: { steps: string[] }) => {
  const classes = useStyles()
  return (
    <List className={classes.block}>
      {items.steps.map((step, index) => (
        <StepItem key={`step-${index}`} index={index} step={step} />
      ))}
    </List>
  )
})

export default function RecipeEditor(
  props: RouteComponentProps<{ id: string }>
) {
  const classes = useStyles()

  const [values, setValues] = useState({
    ingredients: data.ingredients,
    steps: data.steps,
  })

  const onIngredientSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    setValues({
      steps: values.steps,
      ingredients: arrayMove(values.ingredients, oldIndex, newIndex),
    })
  }
  const onStepSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    setValues({
      steps: arrayMove(values.steps, oldIndex, newIndex),
      ingredients: values.ingredients,
    })
  }

  return (
    <form>
      <Grid container>
        <Grid item xs={6} sm={7} md={8} lg={9} xl={10}>
          <TextField
            id="title"
            label="Title"
            defaultValue={data.title}
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
                  <TextField
                    id="serving"
                    label="Serving"
                    className={classes.servingField}
                    defaultValue={data.servings}
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
                    id="time"
                    label="Time"
                    defaultValue={data.time}
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
        defaultValue={data.tags}
        fullWidth
        label="Tags"
        placeholder="Type and press enter to add recipe tags"
        newChipKeyCodes={[13, 32, 188, 190]}
      />
      <IngredientGrid
        axis="xy"
        ingredients={values.ingredients}
        onSortEnd={onIngredientSortEnd}
      />
      <Button variant="contained" color="secondary" className={classes.block}>
        Add ingredient
      </Button>
      <StepList axis="y" steps={values.steps} onSortEnd={onStepSortEnd} />
      <Button variant="contained" color="secondary" className={classes.block}>
        Add step
      </Button>
      <TextField
        className={classes.block}
        id="notes"
        label="Notes"
        multiline
        fullWidth
        defaultValue={data.notes}
      />
    </form>
  )
}
