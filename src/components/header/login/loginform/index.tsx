import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import * as React from 'react';

const defaultTheme = createTheme();

export default function SignIn({setUserContext} : {setUserContext : (x : any) => void}) {
  const [error, setFormError] = React.useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payLoad = {
        userName: data.get('userName'),
        password: data.get('password'),
      };

    try {
       const response = await axios.post(`${process.env.REACT_APP_SERVICE_URI as string}/login`, payLoad, {withCredentials: true})
       setUserContext({...jwtDecode(response.data.accessToken), ...{isLoggedIn: true}})
       localStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
        setFormError(true);
        console.log('Error while login', error)
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="userName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {error&&<Typography component="p" variant="caption" color="error">
            Error while log in, please check credentials
          </Typography>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}