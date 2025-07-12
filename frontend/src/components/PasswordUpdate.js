import React, { useState } from 'react';
import axios from 'axios';
import * as settings from '../settings';

import { makeStyles } from '@mui/styles';
import { Avatar, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  success: {
    color: theme.palette.success.main,
  },
  error: {
    color: theme.palette.error.main,
  }
}));

function PasswordUpdate({ token }) {
  const classes = useStyles();
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormFieldChange = (event) => {
    setSuccess(false);
    setErrorMessage('');
    const { id, value } = event.target;

    if (id === 'new_password1') setNewPassword1(value);
    if (id === 'new_password2') setNewPassword2(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword1 !== newPassword2) {
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      const headers = { Authorization: `Token ${token}` };
      const url = `${settings.API_SERVER}/api/auth/update_password/`;

      const response = await axios.post(url, {
        new_password1: newPassword1,
        new_password2: newPassword2,
      }, { headers });

      console.log("API Response:", response.data);
      setSuccess(true);
      setErrorMessage('');
    } catch (error) {
      console.error("Password update failed:", error.response ? error.response.data : error.message);

      // Extract error message from API response
      let errorMsg = "Password update failed. Please try again.";
      if (error.response?.data) {
        if (error.response.data.new_password2) {
          errorMsg = error.response.data.new_password2.join(" "); // Join multiple errors if any
        } else if (error.response.data.detail) {
          errorMsg = error.response.data.detail;
        }
      }

      setErrorMessage(errorMsg);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {success && <Typography variant="button" className={classes.success} gutterBottom>
          Password update successful!
        </Typography>}
        {errorMessage && <Typography variant="button" className={classes.error} gutterBottom>
          {errorMessage}
        </Typography>}
        <Avatar className={classes.avatar}>
          <VpnKeyIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password1"
            label="Enter New Password"
            type="password"
            id="new_password1"
            onChange={handleFormFieldChange}
            value={newPassword1}
            error={newPassword1 && newPassword2 && newPassword1 !== newPassword2}
            helperText={newPassword1 && newPassword2 && newPassword1 !== newPassword2 ? "Passwords don't match" : ""}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_password2"
            label="Enter Your Password Again"
            type="password"
            id="new_password2"
            onChange={handleFormFieldChange}
            value={newPassword2}
            error={newPassword1 && newPassword2 && newPassword1 !== newPassword2}
            helperText={newPassword1 && newPassword2 && newPassword1 !== newPassword2 ? "Passwords don't match" : ""}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Password
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default PasswordUpdate;
