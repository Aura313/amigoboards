import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function ComboBox(props) {
  let dropdownItems = (props && props.members) || [];
  const handleChange = (e, value) => {
    props.handleMembers(value);
  };

  console.log(props.selectedMembers, "props.selectedMembers")
  return (
    <Autocomplete
      multiple
      id='tags-outlined'
      options={dropdownItems}
      getOptionLabel={(option) => option.userName}
      filterSelectedOptions
      onChange={handleChange}
      defaultValue={props.selectedMembers}
      renderInput={(params) => (
        <TextField
          {...params}
          label='User List'
          placeholder='Choose users...'
        />
      )}
    />
  );
}
