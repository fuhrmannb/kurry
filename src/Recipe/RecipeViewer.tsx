import React from "react"

import { RouteComponentProps } from "react-router-dom"

import GridList from "@material-ui/core/GridList"
import GridListTile from "@material-ui/core/GridListTile"
import GridListTileBar from "@material-ui/core/GridListTileBar"
import Typography from "@material-ui/core/Typography"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from "@material-ui/core/styles"
import Chip from "@material-ui/core/Chip"
import ListItem from "@material-ui/core/ListItem"
import List from "@material-ui/core/List"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Paper from "@material-ui/core/Paper"

const data = {
  title: "Quiche Lorraine",
  img: "quiche.jpeg",
  tags: ["entrée", "omnivore", "lorraine"],
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
      margin: theme.spacing(5),
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    tags: {
      margin: theme.spacing(2),
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    tag: {
      margin: theme.spacing(0.2),
    },
    tile: {
      width: 10,
    },
    tileBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
      height: 55,
    },
    stepNumber: {
      marginLeft: theme.spacing(-0.6),
    },
    stepContent: {
      marginLeft: theme.spacing(-3),
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(-1),
    },
    note: {
      padding: theme.spacing(3, 2),
    },
  })
)

export default function RecipeViewer(
  props: RouteComponentProps<{ id: string }>
) {
  const classes = useStyles()

  // FIXME: resize issue -> scroll bar on the whole page
  const theme = useTheme()
  let col = 3.5
  if (useMediaQuery(theme.breakpoints.up("sm"))) {
    col = 4.5
  }
  if (useMediaQuery(theme.breakpoints.up("md"))) {
    col = 5.5
  }
  if (useMediaQuery(theme.breakpoints.up("lg"))) {
    col = 8.5
  }

  return (
    <React.Fragment>
      <Typography variant="h2" gutterBottom align="center">
        {data.title}
      </Typography>
      <div className={classes.tags}>
        {data.tags.map(tag => (
          <Chip
            size="small"
            color="secondary"
            className={classes.tag}
            label={tag}
          />
        ))}
      </div>
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
      <List>
        {data.steps.map((step, index) => (
          <ListItem alignItems="flex-start">
            <ListItemIcon>
              <Chip
                className={classes.stepNumber}
                size="small"
                color="primary"
                label={index + 1}
              />
            </ListItemIcon>
            <ListItemText className={classes.stepContent} primary={step} />
          </ListItem>
        ))}
      </List>
      <Paper className={classes.note}>
        <Typography variant="h5" component="h3">
          Note
        </Typography>
        <Typography component="p">{data.notes}</Typography>
      </Paper>
    </React.Fragment>
  )
}
