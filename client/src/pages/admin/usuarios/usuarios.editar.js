import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },    
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: 15,
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  TextField: {
    width: '50%'
  },
  formControl: {
    width: '50%'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
}));

export default function UsuariosAtualizar() {
  const classes = useStyles();
  const [nome, setNome]  = useState('');
  const [email, setEmail]  = useState('');
  const [senha, setSenha]  = useState('');
  const [tipo, setTipo]  = useState(''); 

  const { idUsuario } = useParams();

  useEffect(() => {
    async function getUsuario() {
      let response = await api.get('/api/usuarios-details/'+idUsuario);    
      
      setNome(response.data.nome_usuario);
      setEmail(response.data.email_usuario);
      setTipo(response.data.tipo_usuario);
      setSenha(response.data.senha_usuario);
    }

    getUsuario();
  }, [])

  async function handleSubmit() {
    const data = {
      nome_usuario: nome, 
      email_usuario: email, 
      senha_usuario: senha, 
      tipo_usuario: tipo,
      _id: idUsuario
    };

    if (nome !== '' && email !== '' && senha !== '' && tipo !== '') {     
      const response = await api.put('api/usuarios', data);       
        if(response.status === 200) {          
          window.location.href = '/admin/usuarios';
        } else {
          alert('Erro ao atualizar usuário.');
        }                    
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  return (
    <div className={classes.root}>               
      <MenuAdmin title={'Usuários'}/>      
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper elevation={3} className={classes.paper}>
                <h2>Atualização de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>            
                    <TextField
                      className={classes.TextField}
                      required
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      className={classes.TextField}
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="Email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelTipo">Tipo</InputLabel>
                      <Select
                        native
                        labelId="labelTipo"
                        id="tipo"
                        value={tipo}
                        onChange={e => setTipo(e.target.value)}                      
                      >
                        <option aria-label="None" value="" />
                        <option value={1}>Administrador</option>
                        <option value={2}>Funcionário</option>                        
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      className={classes.TextField}                      
                      type="password"
                      required
                      id="senha"
                      name="senha"
                      label="Senha"
                      fullWidth
                      autoComplete="senha"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button                      
                    onClick={handleSubmit} 
                    variant="contained" 
                    color="primary">
                    Salvar
                  </Button>
                  </ Grid>
                </Grid>
              </Paper>
            </Grid>                    
        </ Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
