import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const UserProfileAccountOption = (props) => {
  //const classes = useStyles();
  //const { values, errors, onChange, onBlur } = props;
  return (
    <Grid container spacing={10}>
      <Grid item xs={5}></Grid>
      <Grid item xs={5}></Grid>
    </Grid>
  );
};

export default UserProfileAccountOption;
