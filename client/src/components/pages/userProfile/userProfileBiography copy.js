import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
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
    <Grid container spacing={10}>
      <Grid item xs={5}>
        <Controls.TextField
          label="Full Name"
          name="fullName"
          value={values.fullName}
          multiline
          fullWidth
          InputProps={{
            endAdornment: <PersonOutlineOutlinedIcon />,
            classes: {
              adornedEnd: classes.adornedEnd,
            },
          }}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.fullName}
        ></Controls.TextField>
      </Grid>
      <Grid item xs={5}>
        <Controls.TextField
          label="Full Name"
          name="fullName"
          value={values.fullName}
          multiline
          fullWidth
          InputProps={{
            endAdornment: <PersonOutlineOutlinedIcon />,
            classes: {
              adornedEnd: classes.adornedEnd,
            },
          }}
          onChange={onChange}
          onBlur={onBlur}
          error={errors.fullName}
        ></Controls.TextField>
      </Grid>
    </Grid>
  );
};

export default UserProfileBiography;
