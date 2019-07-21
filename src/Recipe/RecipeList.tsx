import React from "react"

import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActionArea from "@material-ui/core/CardActionArea"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Grid from "@material-ui/core/Grid"
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import AddIcon from "@material-ui/icons/Add"
import PersonIcon from "@material-ui/icons/Person"
import Fab from "@material-ui/core/Fab"

import { Link, RouteComponentProps } from "react-router-dom"

const itemStyles = makeStyles(
  createStyles({
    media: {
      height: 140,
    },
  })
)

function RecipeItem() {
  const classes = itemStyles()

  return (
    <Grid item xs={12} md={6} lg={4} xl={3}>
      <Card>
        <CardActionArea component={Link} to="/recipe/test1">
          <CardMedia className={classes.media} image="test.jpeg" title="Test" />
          <CardContent>
            <Grid container direction="row">
              <Grid item xs={8}>
                <Typography gutterBottom variant="h5" component="h2">
                  My Recipe
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Grid container direction="row" justify="flex-end" spacing={2}>
                  <Grid item>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <PersonIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">4</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Grid container direction="row" alignItems="center">
                      <Grid item>
                        <AccessTimeIcon />
                      </Grid>
                      <Grid item>
                        <Typography variant="body1">15"</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over
              6,000 species, ranging across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            component={Link}
            to="/recipe/edit/test1"
          >
            Edit
          </Button>
          <Button
            size="small"
            color="primary"
            component={Link}
            to="/recipe/delete/test1"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

const recipeStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

export default function RecipeList(props: RouteComponentProps) {
  const classes = recipeStyles()

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
        <RecipeItem />
      </Grid>
      <Fab
        size="large"
        color="secondary"
        aria-label="New"
        className={classes.fab}
      >
        <AddIcon />
      </Fab>
    </React.Fragment>
  )
}
