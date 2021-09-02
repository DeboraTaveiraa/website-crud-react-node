import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../../../components/footer-admin';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import api from '../../../services/api';
import { login, setIdUsuario, setNomeUsuario, setTipoUsuario } from '../../../services/auth';

function Copyright() {
  return (
    <Box pt={4}>
      <Footer />
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [ email, setEmail ] = useState('');
  const [ senha, setPassword ] = useState('');
  const [ showPassword, setShowPassword ] = useState(false);
  const [ loading, setLoading ] = useState(false);

  async function handleSubmit() {    
    await api.post('/api/usuarios/login',{email,senha})
      .then(res => {
        if(res.status===200){
          if(res.data.status===1){
            login(res.data.token);
            setIdUsuario(res.data.id_client);
            setNomeUsuario(res.data.user_name);
            setTipoUsuario(res.data.user_type);

            window.location.href= '/admin'
          }else if(res.data.status===2){
            alert('Atenção: '+res.data.error);
          } 
          setLoading(false);
        }else{
          alert('Erro no servidor');   
          setLoading(false);            
        }
      })
  } 

  function loadSubmit() {
    setLoading(true);
    setTimeout(
      () => handleSubmit(), 2000
    )
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>       
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Digite seu email"
          name="email"
          autoComplete="email"
          autoFocus
          value={ email }
          onChange={ e => setEmail(e.target.value) }
        />        
        <FormControl variant="outlined" style={{width:'100%',marginTop:10}}>
            <InputLabel htmlFor="campoSenha">Digite sua senha</InputLabel>
            <OutlinedInput
              id="campoSenha"
              type={showPassword ? 'text' : 'password'}
              value={senha}
              onChange={e => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={e => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              labelWidth={120}
            />
          </FormControl>
        <Button        
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={loadSubmit}
          disabled={loading}
        >
          { loading? <CircularProgress />: 'Entrar' }          
        </Button>                 
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
