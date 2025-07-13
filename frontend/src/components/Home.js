import React, { useState } from 'react';
import axios from 'axios';
import * as settings from '../settings';

import { CssBaseline, Container, Grid, Paper, Typography, Slider, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// Main Home component
function Home({ token }) {
  // State for dimensions and prediction result
  const [inputs, setInputs] = useState({
    age: 30,
    bmi: 25,
    children: 0,
    gender: 'male',
    smoker: 'no',
    region: 'northeast'
  });
  const [prediction, setPrediction] = useState(null);

  // Handle slider changes
  const handleSliderChange = (name) => (_, newValue) => {
    setInputs((prev) => ({ ...prev, [name]: newValue }));
  };

  // Handle dropdown change
  const handleSelectChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  // API call for prediction
  const handlePredict = async () => {
    try {
      const requestData = {
        age: inputs.age,
        bmi: inputs.bmi,
        children: inputs.children,
        smoker: inputs.smoker === 'yes' ? 1 : 0,
      };
  
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/predict/`, requestData, {
        headers: { Authorization: `Token ${token}` },
      });
  
      console.log("API Response:", response.data); // Check the response in console
      setPrediction(response.data["Predicted Insurance Cost ($)"]);
    } catch (error) {
      console.error("Prediction failed:", error.response ? error.response.data : error.message);
      alert("Prediction failed. Please check the console for details.");
    }
  };
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        fixed
        sx={{
          maxWidth: "75%",
          mt: "5vh",
          mb: "5vh",
          borderRadius: 2,
          backgroundColor: "action.disabledBackground",
          p: 3,
          overflow: "hidden",
        }}
      >
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <Paper sx={{ p: 2 }} >
              <Typography variant="h5">Medical Insurance Price Predictor</Typography>
              <Typography variant='caption'>Enter your details:</Typography>
            </Paper>
            <Paper sx={{ p: 3, mb: 2 }}>
            <Typography>Age</Typography>
              <Slider min={5} max={80} value={inputs.age} onChange={handleSliderChange('age')} valueLabelDisplay='on' sx={{ mt: 2 }} />

              <Typography>BMI</Typography>
              <Slider min={5} max={100} value={inputs.bmi} onChange={handleSliderChange('bmi')} valueLabelDisplay='on' sx={{ mt: 2 }} />

              <Typography>Children</Typography>
              <Slider min={0} max={5} value={inputs.children} onChange={handleSliderChange('children')} valueLabelDisplay='on' sx={{ mt: 2 }} />

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select name='gender' value={inputs.gender} onChange={handleSelectChange}>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Smoker</InputLabel>
                <Select name='smoker' value={inputs.smoker} onChange={handleSelectChange}>
                  <MenuItem value='yes'>Yes</MenuItem>
                  <MenuItem value='no'>No</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Region</InputLabel>
                <Select name='region' value={inputs.region} onChange={handleSelectChange}>
                  <MenuItem value='northeast'>Northeast</MenuItem>
                  <MenuItem value='northwest'>Northwest</MenuItem>
                  <MenuItem value='southeast'>Southeast</MenuItem>
                  <MenuItem value='southwest'>Southwest</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          <Grid item xs={2} container justifyContent="center">
            <Button variant="contained" color="primary" onClick={handlePredict} sx={{ mt:4 }}>
              Predict
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Paper sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="caption">Predicted Insurance Cost ($):</Typography>
              <Typography variant="h6">{prediction || "N/A"}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default Home;
