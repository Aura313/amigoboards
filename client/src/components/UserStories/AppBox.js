import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const options = ['Not Yet Started','In Progress', 'Completed'];

export default function AppBox(props) {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      {/* <div>{`value: ${value !== null ? `'${value}'` : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div> */}
      <br />
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          props.createStatus(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 200, paddingBottom: 25 , paddingLeft: 100}}
        renderInput={(params) => <TextField {...params} label="Status" variant="outlined" />}
      />
    </div>
  );
}