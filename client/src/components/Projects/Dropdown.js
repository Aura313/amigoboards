import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
//   const [, setTitleValue] = useState({});

const handleChange = (e, value) => {
console.log(value, "smsmms")
props.handleMembers(value);
}
  return (
    <Autocomplete
      id='combo-box-demo'
      options={top100Films}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label='Users' variant='outlined' />
      )}
      onChange={handleChange}
    />
  );
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
];
