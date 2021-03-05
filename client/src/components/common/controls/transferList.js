import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "auto",
  },
  cardHeader: {
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.common.grey,
  },
  list: {
    width: 200,
    height: 230,
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
  return [...a, ...not(b, a)];
}

export default function TransferList(props) {
  const classes = useStyles();
  const { label, name, value, error = null, onChange, options } = props;
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState(options);
  const [right, setRight] = useState(value);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items) => intersection(checked, items).length;

  const handleToggleAll = (items) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const convertToDefEventPara = (name, value) => ({
    currentTarget: {
      name,
      value,
    },
  });

  const handleCheckedRight = () => {
    const selectedValues = right.concat(leftChecked);
    setRight(selectedValues);
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    onChange(convertToDefEventPara(name, selectedValues));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    const selectedValues = not(right, rightChecked);
    onChange(convertToDefEventPara(name, selectedValues));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        className={classes.cardHeader}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{ "aria-label": "all items selected" }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List className={classes.list} dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                  color="primary"
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <FormControl
      variant="outlined"
      size="small"
      {...(error && { error: true })}
    >
      <Grid container spacing={2} className={classes.root}>
        <Grid item>
          <InputLabel>{label}</InputLabel>
        </Grid>
      </Grid>
      <br></br>
      <Grid
        container
        spacing={2}
        justify="space-evenly"
        alignItems="center"
        className={classes.root}
      >
        <Grid item>{customList("Choices", left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
              color="primary"
            >
              {<ArrowRightIcon />}
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.button}
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
              color="primary"
            >
              {<ArrowLeftIcon />}
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList("Chosen", right)}</Grid>
      </Grid>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
