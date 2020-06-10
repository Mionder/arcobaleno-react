import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import {maxPrice} from "../../actions/actionCreater";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    root: {
      width: 300 + theme.spacing(3) * 2,
    },
    margin: {
      // height: theme.spacing(3),
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

function CustomizedSlider(props) {
  const [priceValue, setPrice] = React.useState(290);
  const {maxPrice} = props;
  const handlePrice = (event, value) => {
    setPrice(value);
    maxPrice(value);
  }
    const classes = useStyles();
  return(
      <div>
        <PrettoSlider valueLabelDisplay="auto" value={priceValue} onChange={handlePrice} min={87} max={290} aria-label="pretto slider" defaultValue={290} />
        <div className={classes.margin} />
      </div>
  )
}

export default connect(state =>({
  maxPrice: state.maxPrice,
}),{maxPrice})(CustomizedSlider)