import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Controls from "./../../common/controls/controls";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const UserProfileBiography = (props) => {
  const classes = useStyles();
  const { values, errors, onChange, onBlur } = props;
  return (
    // description - text area
    // interests/hobby
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Controls.TextField
            label="Introduction"
            name="introduction"
            value={values.introduction}
            multiline
            rows={5}
            onChange={onChange}
            onBlur={onBlur}
            error={errors.introduction}
          ></Controls.TextField>
        </Grid>
        <Grid item xs>
          <Controls.TransferList
            label="Interests/Hobbies"
            name="interests"
            value={values.interests}
            error={errors.interests}
            onChange={onChange}
            onBlur={onBlur}
            options={[
              "Cooking",
              "Gym",
              "Music",
              "Reading",
              "Travelling",
              "Writting",
            ]}
          ></Controls.TransferList>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfileBiography;
