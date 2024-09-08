import React, { useState } from 'react';
import { TextField, Button, Avatar, Container, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserRegistration = () => {
  const form = useForm();
  const {register} = form
  const {name,ref,onChange,onBlur} = register('username')
  const classes = useStyles();
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAvatarChange = (event) => {
    setAvatar(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('avatar', avatar);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post('https://api.example.com/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root}>
        <Avatar className={classes.avatar} src={avatar}>
          <AccountCircleIcon fontSize="large" />
        </Avatar>
        <Typography component="h1" variant="h5">
          User Registration
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            onBlur={onBlur}
            ref={ref}
            onChange={onChange}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email Address"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
          />
          <label htmlFor="avatar-upload">
            <Button variant="outlined" component="span">
              Upload Avatar
            </Button>
          </label>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default UserRegistration;
