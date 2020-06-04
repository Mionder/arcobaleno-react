import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import './checkbox.css';
import {setComponents, unsetComponent} from "../../actions/actionCreater";
import {connect} from 'react-redux';

function Checkboxes(props) {
    const [checked, setChecked] = React.useState(true);
  
    const handleChange = event => {
      setChecked(event.target.checked);
    };

    const setComponent = event => {
      const {setComponents,unsetComponent, myComponents} = props;
      const newLine = label.concat(", ");
      if(myComponents.includes(newLine)){
        unsetComponent(label);
      }
      else {setComponents(label);}
    };
  const {label, id} = props;
    return (
      <div>
        <Checkbox
          onClick={setComponent}
          onChange={handleChange}
          value="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          id={id}
        />
        <label htmlFor={id}>{label}</label>
        </div>
        )
}

export default connect(state =>({
  myComponents: state.components
}),{setComponents, unsetComponent})(Checkboxes)