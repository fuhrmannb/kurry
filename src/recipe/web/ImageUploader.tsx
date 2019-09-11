import React, { createRef, useState } from "react"

import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  IconButton,
} from "@material-ui/core"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import CloudUpload from "@material-ui/icons/CloudUpload"
import ClearIcon from "@material-ui/icons/Clear"

import Dropzone, { DropzoneRef } from "react-dropzone"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    imageCard: {
      height: 160,
    },
    noImageCard: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    noImageContent: {
      textAlign: "center",
    },
    noImageIcon: {
      marginLeft: "auto",
      marginRight: "auto",
    },
    button: {
      margin: theme.spacing(1),
    },
  })
)

export default function ImageUploader(props: {
  title: string
  onImageUpload: (file: File | undefined, previewURL: string) => void
  className?: string
  initialImageURL?: string
}) {
  const classes = useStyles()

  const [previewURL, _setPreviewURL] = useState(props.initialImageURL)

  const setUpload = (file: File | undefined) => {
    const previewURL = file ? URL.createObjectURL(file) : ""
    _setPreviewURL(previewURL)
    props.onImageUpload(file, previewURL)
  }

  const dropzoneRef = createRef<DropzoneRef>()
  const openDialog = () => {
    if (dropzoneRef.current) {
      dropzoneRef.current.open()
    }
  }
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length !== 1) {
      return
    }
    const file = acceptedFiles[0]
    setUpload(file)
  }

  const removeUpload = () => {
    setUpload(undefined)
  }

  let uploadButton = (
    <IconButton aria-label="upload image" onClick={openDialog}>
      <CloudUpload />
    </IconButton>
  )
  let removeButton = (
    <IconButton
      aria-label="delete image"
      disabled={previewURL === ""}
      onClick={removeUpload}
    >
      <ClearIcon />
    </IconButton>
  )
  let uploadImgPreview: JSX.Element
  if (previewURL) {
    uploadImgPreview = (
      <CardMedia
        image={previewURL}
        title="uploaded image"
        className={classes.imageCard}
      />
    )
  } else {
    uploadImgPreview = (
      <CardContent className={classes.noImageCard}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.noImageContent}
        >
          No image, click to upload
          <br />
          <CloudUpload fontSize="large" color="action" />
        </Typography>
      </CardContent>
    )
  }

  return (
    <Dropzone
      ref={dropzoneRef}
      noClick
      noKeyboard
      multiple={false}
      accept="image/*"
      onDrop={onDrop}
    >
      {({ getRootProps, getInputProps }) => (
        <Box className={props.className}>
          <Typography variant="caption" color="textSecondary">
            {props.title}
          </Typography>
          <Card {...getRootProps()}>
            <CardActionArea onClick={openDialog}>
              <input {...getInputProps()} />
              {uploadImgPreview}
            </CardActionArea>
            <CardActions>
              {uploadButton}
              {removeButton}
            </CardActions>
          </Card>
        </Box>
      )}
    </Dropzone>
  )
}
