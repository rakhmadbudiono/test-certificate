import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    placeSelf: "flex-end",
  },
}));

export default function Error(props) {
  const classes = useStyles();

  return <div>{props.message}</div>;
}
