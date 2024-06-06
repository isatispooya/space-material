import React, { useState } from 'react';
// import { Calendar  }   from 'react-multi-date-picker';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

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

function Forms() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOption, setSelectedOption] = useState('a');
  const [showTextFields, setShowTextFields] = useState({ a: true, b: false });
  const [date, setDate] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitted(true);
    alert('Form submitted!');
  };

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

      {/* <TextField sx={{ marginTop: 10 }} id="outlined-controlled" label="نام و نام خانوادگی" />

      <TextField
        id="outlined-uncontrolled"
        label="صادره از"
        defaultValue="foo"
        sx={{ marginTop: 5 }}
      /> */}

      <FormControl component="fieldset">
        <FormLabel sx={{marginTop:20}} component="legend">انتخاب گزینه‌ها</FormLabel>
        <RadioGroup
          aria-label="options"
          name="options"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <FormControlLabel value="a" control={<Radio />} label="حقیقی" />
          <FormControlLabel value="b" control={<Radio />} label="حقوقی" />
        </RadioGroup>
        <FormHelperText>گزینه‌های مورد نظر خود را انتخاب کنید</FormHelperText>
      </FormControl>

      
      {showTextFields.a && (
        <>
          <TextField
            sx={{ marginTop: 10 }}
            id="additional-text-field-a-1"
            label="نام و نام خانوادگی"
          />
          <TextField id="additional-text-field-a-2" label="کد ملی" sx={{ marginTop: 5 }} />
          <TextField id="additional-text-field-a-3" label="محل صدور" sx={{ marginTop: 5 }} />
          <TextField id="additional-text-field-a-3" label="ایمیل" sx={{ marginTop: 5 }} />
          <TextField id="additional-text-field-a-3" label="وضیعیت تأل" sx={{ marginTop: 5 }} />
          <TextField id="additional-text-field-b-3" label=" تاریخ تولد" sx={{ marginTop: 5 }} />
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            sx={{ direction: 'rtl', marginTop: 20 }}
            value={date}
            onChange={setDate}
          />
          <Button sx={{ marginTop: 5 }} type="button" onClick={handleSubmit}>
            submit
          </Button>
          {isSubmitted && <p>Form submitted</p>}
        </>
      )}

      {showTextFields.b && (
        <>
          <TextField
            sx={{ marginTop: 10 }}
            id="additional-text-field-b-1"
            label=" نام و نام خانوادگی"
          />
          <TextField id="additional-text-field-b-2" label="کد ملی " sx={{ marginTop: 5 }} />
          <TextField id="additional-text-field-b-3" label="محل صدور" sx={{ marginTop: 5 }} />
          <TextField id="additional-text-field-b-3" label="ایمیل" sx={{ marginTop: 5 }} />
          {/* <TextField id="additional-text-field-b-3" label=" تاریخ تولد" sx={{ marginTop: 5 }} /> */}

          <DatePicker
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
            sx={{ direction: 'rtl', marginTop: 20 }}
            value={date}
            onChange={setDate}
          />
          <Button sx={{ marginTop: 5 }} type="button" onClick={handleSubmit}>
            submit
          </Button>
          {isSubmitted && <p>Form submitted</p>}
        </>
      )}
    </div>
  );
}

export default Forms;
