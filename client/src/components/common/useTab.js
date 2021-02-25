import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Box, Tab, Tabs as MuiTabs } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    //flexGrow: 1,

    backgroundColor: theme.palette.primary.main,
  },
  tabLabel: {
    textTransform: "none",
  },
}));

export function useTab(initialTabValue) {
  const [tabValue, setTabValue] = useState(initialTabValue);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return {
    tabValue,
    handleTabChange,
  };
}

// display each tabs at AppBar
export function Tabs(props) {
  const classes = useStyles();
  const { labelId, onChange, selectionFollowsFocus, value, tabLabels } = props;

  return (
    <AppBar position="static" className={classes.root}>
      <MuiTabs
        aria-labelledby={labelId}
        onChange={onChange}
        selectionFollowsFocus={selectionFollowsFocus}
        value={value}
      >
        {tabLabels.map((tabLabel, index) => {
          return (
            <Tab
              key={`${index}-${tabLabel}`}
              label={tabLabel}
              aria-controls={`a11y-tabpanel-${index}`}
              id={`a11y-tab-${index}`}
              // wrapped
              className={classes.tabLabel}
            />
          );
        })}
      </MuiTabs>
    </AppBar>
  );
}

Tabs.propTypes = {
  labelId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectionFollowsFocus: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

// add children/component at each tab panel
export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`a11y-tabpanel-${index}`}
      aria-labelledby={`a11y-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
