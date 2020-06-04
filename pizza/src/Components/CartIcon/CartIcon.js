import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    color: '#fff',
    '& > *': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '& .MuiBadge-root': {
      marginRight: '5px'
    },
  },
}));

export default function BadgeVisibility(props) {
  const classes = useStyles();
  const [count, setCount] = React.useState(0);
//   const [invisible, setInvisible] = React.useState(false);

//   const handleBadgeVisibility = () => {
//     setInvisible(!invisible);
//   };
  return (
    <div className={classes.root}>
      <div>
      <Badge color="secondary" variant="dot" invisible={props.invisible}>
          <ShoppingCartIcon />
        </Badge>
        {/* <FormControlLabel
          control={<Switch color="primary" checked={!invisible} onChange={handleBadgeVisibility} />}
        /> */}
        {/* <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup> */}
      </div>
      {/* <div>
        <Badge color="secondary" variant="dot" invisible={invisible}>
          <MailIcon />
        </Badge>
        <FormControlLabel
          control={<Switch color="primary" checked={!invisible} onChange={handleBadgeVisibility} />}
          label="Show Badge"
        />
      </div> */}
    </div>
  );
}