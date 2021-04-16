import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Close as CloseIcon } from "@material-ui/icons";
import { Dialog, DialogContent, DialogContentText } from "@material-ui/core";

import Home from "./Home";

const useStyles = makeStyles((theme) => ({
  closeIcon: {
    placeSelf: "flex-end",
  },
}));

export default function Error(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Home />
      <Dialog open={open} onClose={handleClose} className={classes.dialog}>
        <CloseIcon onClick={handleClose} className={classes.closeIcon} />
        <DialogContent>
          <DialogContentText>{props.message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}
