import React from "react";
import Cookies from "universal-cookie";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import contract from "../libs/contract";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  revoke: {
    width: "8.7em",
    height: "3em",
    color: "#ffffff",
    backgroundColor: "#f50057",
    textAlign: "center",
  },
  approve: {
    width: "8.7em",
    height: "3em",
    color: "#ffffff",
    backgroundColor: "#f50057",
    textAlign: "center",
  },
  center: {
    justifyContent: "center",
    textAlign: "center",
  },
  rightSide: {
    float: "right",
    marginLeft: "5px",
    fontWeight: "bold",
  },
  bottom: {
    marginBottom: "5px",
    justifyContent: "center",
  },
  bold: {
    fontWeight: "bold",
    marginBottom: "22px",
  },
});

const cookie = new Cookies();

export default function CertificateCard(props) {
  const classes = useStyles();

  const revokeTester = async () => {
    await contract.revokeTester(props.tester_address, cookie.get("account"));

    window.location.reload();
  };

  const approveTester = async () => {
    await contract.approveTester(props.tester_address, cookie.get("account"));

    window.location.reload();
  };

  if (props.tester_institution_name)
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            className={(classes.pos, classes.center)}
          >
            Address: {props.tester_address}
          </Typography>
          <hr />
          <Typography variant="body2" component="p">
            Institution Name:{" "}
            <div className={classes.rightSide}>
              {props.tester_institution_name}
            </div>
          </Typography>
          <hr />
          <Typography variant="body2" component="p">
            Lokasi:{" "}
            <div className={classes.rightSide}>{props.tester_location}</div>
          </Typography>
          <hr />
          <Typography variant="body2" component="p">
            Kontak:{" "}
            <div className={classes.rightSide}>{props.tester_contact}</div>
          </Typography>
        </CardContent>
        <CardActions className={(classes.center, classes.bottom)}>
          <div>
            {" "}
            {props.is_tester_approved ? (
              <Button className={classes.revoke} onClick={revokeTester}>
                Revoke
              </Button>
            ) : (
              <Button className={classes.approve} onClick={approveTester}>
                Approve
              </Button>
            )}
          </div>
        </CardActions>
      </Card>
    );
  else
    return (
      <Card className={classes.root}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            className={(classes.pos, classes.center)}
          >
            Tester address not found.
          </Typography>
        </CardContent>
      </Card>
    );
}
