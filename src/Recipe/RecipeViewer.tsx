import React from "react"

import { RouteComponentProps } from "react-router-dom"

import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import Typography from "@material-ui/core/Typography"
import Stepper from "@material-ui/core/Stepper"
import Step from "@material-ui/core/Step"
import StepContent from "@material-ui/core/StepContent"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles"
import StepLabel from "@material-ui/core/StepLabel"

const data = {
  name: "Quiche Lorraine",
  img: "quiche.jpeg",
  bakeTime: 45,
  servings: 4,
  ingredients: [
    {
      img: "/test/creme.jpeg",
      title: "Crème",
      quantity: "20",
      unit: "cL",
    },
    {
      img: "/test/lardons.jpeg",
      title: "Lardons",
      quantity: "200",
      unit: "g",
    },
    {
      img: "/test/beurre.jpeg",
      title: "Beurre",
      quantity: "30",
      unit: "g",
    },
    {
      img: "/test/oeufs.jpeg",
      title: "Oeufs",
      quantity: "3",
    },
    {
      img: "/test/sel.jpeg",
      title: "Sel",
    },
    {
      img: "/test/poivre.jpeg",
      title: "Poivre",
    },
  ],
  steps: [
    "Préchauffer le four à 180°C (thermostat 6).",
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    tile: {
      width: 10,
    },
    tileBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      height: 55,
      minWidth: 200,
    },
  })
)

export default function RecipeViewer(
  props: RouteComponentProps<{ id: string }>
) {
  const classes = useStyles()

  // FIXME: resize issue -> col seems to not be updated correctly
  const theme = useTheme()
  let col = 4.5
  if (useMediaQuery(theme.breakpoints.up("md"))) {
    col = 7.5
  }
  if (useMediaQuery(theme.breakpoints.up("lg"))) {
    col = 9.5
  }

  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom>
        {data.name}
      </Typography>
      <Typography variant="h4" gutterBottom>
        Ingredients:
      </Typography>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={col} spacing={8}>
          {data.ingredients.map(ingredient => (
            <GridListTile key={ingredient.img}>
              <img src={ingredient.img} alt={ingredient.title} />
              <GridListTileBar
                className={classes.tileBar}
                title={ingredient.title}
                subtitle={`${ingredient.quantity} ${ingredient.unit}`}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
      <Typography variant="h4" gutterBottom>
        Steps:
      </Typography>
      <ol>
        {data.steps.map((step, index) => (
          <li>{step}</li>
        ))}
      </ol>
      Note : <Typography>{data.notes}</Typography>
    </React.Fragment>
  )
}
