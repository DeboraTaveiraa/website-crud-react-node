import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuAdmin from '../../../components/menu-admin';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';
import { getNomeTipo } from '../../../functions/static_data';

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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    minWidth: 650,
  },
}));

export default function ListUser() {
  const classes = useStyles();  

  const [usuarios, setUsuarios] = useState([]);

  // Irá rodar assim que o componente for criado
  useEffect(() => {
    async function loadUsuarios () {
      const response = await api.get('/api/usuarios');
      setUsuarios(response.data);
    }
    loadUsuarios();
  }, []);

  async function handleDelete(id) {
    if(window.confirm('Deseja realmente excluir este usuário?')) {
      let result = await api.delete('/api/usuarios/'+id);
      if (result.status === 200) {
        window.location.href = '/admin/usuarios';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente.')
      }
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
            <Button style={{marginBottom: 10}} variant="contained" href={'/admin/usuarios/cadastrar'} color="secondary">Novo</Button>
            <Paper elevation={3} className={classes.paper}>
                <h2>Listagem de Usuários</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>            
                  <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Nome</TableCell>
                          <TableCell align="center">Email</TableCell>
                          <TableCell align="center">Tipo</TableCell>
                          <TableCell align="center">Data de Cadastro</TableCell>
                          <TableCell align="right">Opções</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {usuarios.map((user) => (
                          <TableRow key={user._id}>
                            <TableCell component="th" scope="row">
                              {user.nome_usuario}
                            </TableCell>
                            <TableCell align="center">{user.email_usuario}</TableCell>
                            <TableCell 
                            align="center">                              
                              <Chip label={getNomeTipo(user.tipo_usuario)} color="primary"/>                             
                            </TableCell>
                            <TableCell align="center">
                              {new Date(user.createdAt).toLocaleString('pt-br')}
                            </TableCell>

                            <TableCell align="right">
                            <ButtonGroup variant="contained" aria-label="contained primary button group">
                              <Button href={'/admin/usuarios/editar/'+ user._id} color="primary">Atualizar</Button>
                              <Button 
                              onClick={() => handleDelete(user._id)}
                              color="secondary">Excluir</Button>                
                            </ButtonGroup>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  </Grid>                 
                </Grid>
              </Paper>
            </ Grid>                  
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
