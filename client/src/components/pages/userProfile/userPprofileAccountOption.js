import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const UserProfileAccountOption = (props) => {
  const classes = useStyles();
  //const { values, errors, onChange, onBlur } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12}></Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </div>
  );
};

export default UserProfileAccountOption;
