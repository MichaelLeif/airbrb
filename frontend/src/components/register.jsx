import React, { useContext } from 'react'
import { apiCall } from '../helpers/apicalls';
import { TextField, Alert, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../loginContext';
import { AuthBox, AuthTitle, Line } from '../helpers/generics';

const RegisterButton = styled(Button)({
  textTransform: 'none',
  padding: '10px 0px',
  borderRadius: '5px',
  backgroundColor: '#e00c64',
  fontSize: '1rem',
  marginTop: '10px',
  marginBottom: '30px',
  width: '100%',
  '&:hover': {
    backgroundColor: '#e00c64',
    borderColor: '#e00c64',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#e00c64',
    borderColor: '#e00c64',
  },
});

const Error = styled(Alert)({
  margin: '10px 0px;'
})

export const Register = () => {
  // Use effect state
  const navigate = useNavigate();
  const { userLoggedIn, setUserLoggedIn } = useContext(LoginContext)
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [error, setError] = React.useState('');
  console.log(userLoggedIn);

  const setToken = (token) => {
    localStorage.setItem('token', token);
  }

  const setUser = (user) => {
    localStorage.setItem('user', user);
  }

  const register = () => {
    console.log(register)
    if (!passwordsMatch(password, confirmPassword)) {
      return;
    }
    apiCall('POST', '/user/auth/register', { name, email, password }, true)
      .then((data) => {
        setToken(data.token);
        setUser(email);
        setUserLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        setError(err.error);
      })
  }

  const passwordsMatch = (p1, p2) => {
    if (p1 !== p2) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  }

  const ErrorMessage = () => {
    return <Error severity="error">{error}</Error>;
  }

  return (
    <AuthBox maxWidth="sm">
      <div>
        <AuthTitle>
          <h3> Register </h3>
        </AuthTitle>
        <Line/>
        <h2> Welcome to AirBnb </h2>
        {error ? <ErrorMessage/> : null}
        <TextField fullWidth id="login-name" label="Name" type='text' value={name} onChange={e => setName(e.target.value)} variant="outlined" margin="normal"/> <br/>
        <TextField fullWidth id="login-email" label="Email" type='text' value={email} onChange={e => setEmail(e.target.value)} variant="outlined" margin="normal"/> <br/>
        <TextField fullWidth id="login-password" label="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} variant="outlined" margin="normal"/> <br/>
        <TextField fullWidth id="login-confirm-password" label="Confirm your password" type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} variant="outlined" margin="normal"/> <br/>
        <RegisterButton variant="contained" disableElevation onClick={() => register()}>
          Register
        </RegisterButton>
      </div>
    </AuthBox>
  )
}
