import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';

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
}));

export default function UsuariosCadastrar() {
  const classes = useStyles();  

  return (
    <div className={classes.root}>               
      <MenuAdmin title={'Usuários'}/>      
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper elevation={3} className={classes.paper}>
                <h2>Cadastro de Usuários</h2>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id="labelTipo">Tipo</InputLabel>
                      <Select
                        native
                        labelId="labelTipo"
                        id="tipo"
                        // value={state.age}
                        // onChange={handleChange}                        
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
                    />
                  </Grid>
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
