import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import shayan from "../assests/shayan.jpg";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
  media: {
    height: 340,
  },
});

const About = () => {
  const classes = useStyles();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1rem",
      }}
    >
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={shayan} title="Shayan" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Shayan Chatterjee
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Full Stack Web Developer
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <a href="https://github.com/Cshayan" target="_blank">
            <GitHubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/shayan-chatterjee-a41771167/"
            target="_blank"
          >
            <LinkedInIcon />
          </a>
        </CardActions>
      </Card>
    </div>
  );
};

export default About;
