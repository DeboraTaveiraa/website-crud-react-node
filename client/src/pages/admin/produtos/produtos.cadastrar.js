import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import MenuAdmin from '../../../components/menu-admin';
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';

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

export default function RegisterProducts() {
  const classes = useStyles();

  const [name, setName]  = useState('');
  const [description, setDescription]  = useState('');
  const [price, setPrice]  = useState('');
  const [quantity, setQuantity]  = useState('');

  async function handleSubmit() {
    const data = {
      nome_produto: name, 
      descricao_produto: description, 
      preco_produto: price, 
      qtd_produto: quantity,     
    };

    if (name !== '' && description !== '' && price !== '' && quantity !== '') {      
      const response = await api.post('api/produtos', data);        
        if(response.status === 200) {            
          window.location.href = '/admin/produtos';
        } else {
          alert('Erro ao cadastrar produto.');
        }            
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  return (
    <div className={classes.root}>               
      <MenuAdmin title={'Produtos'}/>      
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper elevation={3} className={classes.paper}>
                <h2>Cadastro de Produtos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>            
                    <TextField
                      className={classes.TextField}
                      required
                      id="name"
                      name="name"
                      label="Nome"
                      fullWidth
                      autoComplete="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      className={classes.TextField}
                      required
                      id="description"
                      name="description"
                      label="Descrição"
                      fullWidth
                      autoComplete="description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      className={classes.TextField}
                      required
                      id="price"
                      name="price"
                      label="Preço"
                      fullWidth
                      autoComplete="price"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </Grid>                  
                  <Grid item xs={12} sm={12}>
                    <TextField
                      className={classes.TextField}                                           
                      required
                      id="quantity"
                      name="quantity"
                      label="Quantidade"
                      fullWidth
                      autoComplete="quantity"
                      value={quantity}
                      onChange={e => setQuantity(e.target.value)}
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
