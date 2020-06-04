import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      height: theme.spacing(3),
    },
  }));

  const PrettoSlider = withStyles({
    root: {
      color: '#bf142e',
      height: 8,
      width: '300px'
    },
    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus,&:hover,&$active': {
        boxShadow: 'inherit',
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

export default function CustomizedSlider(props) {
    const classes = useStyles();
  return(
      <div>
        <PrettoSlider valueLabelDisplay="auto" min={50} max={250} aria-label="pretto slider" defaultValue={250} />
        <div className={classes.margin} />
      </div>
  )
}