import React, { useState } from 'react';

import { PhotoCamera } from '@mui/icons-material';
import {
  Avatar,
  Button,
  IconButton,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@mui/material';
//-----------------------------------------------------------------------------

function ProfilePhotoUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [showTextFields, setShowTextFields] = useState({ a: false, b: false });

  const handleOptionChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);

    // Reset the showTextFields state
    setShowTextFields({ a: false, b: false });

    // Show text fields based on the selected option
    setShowTextFields((prevState) => ({
      ...prevState,
      [value]: true,
    }));
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <h1>Reza</h1>
      <Avatar
        alt="Profile Photo"
        src={selectedImage}
        sx={{ width: 200, height: 200, marginBottom: 2 }}
      />
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />

      <IconButton color="primary" aria-label="upload picture" component="span">
        <PhotoCamera />
      </IconButton>

      <Button variant="contained" color="primary" component="label">
        Upload
        <input type="file" accept="image/*" hidden onChange={handleImageChange} />
      </Button>

      <TextField sx={{ marginTop: 10 }} id="outlined-controlled" label="نام و نام خانوادگی" />

      <TextField
        id="outlined-uncontrolled"
        label="صادره از"
        defaultValue="foo"
        sx={{ marginTop: 5 }}
      />

      {/* RadioGroup component with FormControl, FormLabel */}
      <FormControl component="fieldset">
        <FormLabel component="legend">انتخاب گزینه‌ها</FormLabel>
        <RadioGroup
          aria-label="options"
          name="options"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <FormControlLabel value="a" control={<Radio />} label="الف" />
          <FormControlLabel value="b" control={<Radio />} label="ب" />
        </RadioGroup>
        <FormHelperText>گزینه‌های مورد نظر خود را انتخاب کنید</FormHelperText>
      </FormControl>

      {/* Conditional rendering for additional text fields */}
      {showTextFields.a && (
        <>
          <TextField
            sx={{ marginTop: 10 }}
            id="additional-text-field-a-1"
            label="Additional Field for الف"
          />
          <TextField
            id="additional-text-field-a-2"
            label="Additional Field for الف"
            sx={{ marginTop: 5 }}
          />
        </>
      )}

      {showTextFields.b && (
        <>
          <TextField
            sx={{ marginTop: 10 }}
            id="additional-text-field-b-1"
            label="Additional Field for ب"
          />
          <TextField
            id="additional-text-field-b-2"
            label="Additional Field for ب"
            sx={{ marginTop: 5 }}
          />
        </>
      )}
    </div>
  );
}

export default ProfilePhotoUploader;
