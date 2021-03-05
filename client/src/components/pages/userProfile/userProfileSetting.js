import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Controls from "./../../common/controls/controls";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const UserProfileSetting = (props) => {
  const classes = useStyles();
  const { values, errors, onChange, onBlur } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <Controls.Switch
            switchName="Membership"
            label="I want to become a member"
            name="joinMember"
            value={values.joinMember}
            color="primary"
            onChange={onChange}
            onBlur={onBlur}
            error={errors.joinMember}
          ></Controls.Switch>
        </Grid>
        <Grid item xs={5}></Grid>
      </Grid>
    </div>
  );
};

export default UserProfileSetting;
