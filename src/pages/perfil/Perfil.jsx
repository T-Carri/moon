
import React, {useEffect, useState} from 'react'
import { 
    useNavigate, 
    Outlet
  } from 'react-router-dom';
  import { UserAuth } from '../../context/AuthContext';


import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MenuIcon from '@mui/icons-material/Menu';
import  Container  from '@mui/material/Container';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import ChatIcon from '@mui/icons-material/Chat';
import { db } from '../../firebase/firebase';
import { collection, setDoc, addDoc, query, onSnapshot } from 'firebase/firestore';
import { useRef } from 'react';
const theme = createTheme({
    palette: {
      primary: {
        main: '#000000',
      },
    },
  });


export const Perfil = () => {
  
  

const comentarioRef=useRef(null)

        const {logout, user}= UserAuth();
        const navigate = useNavigate();
        
      
      
        useEffect(()=>{
          let authToken = sessionStorage.getItem('Auth Token')
          if(authToken){
              navigate('/account')
          }
          if(!authToken){
              navigate('/')
          }
      },[])
      //LOGOUT
      const handleLogout = async()=>{
            try{
              await logout().then(
                navigate('/'), 
                sessionStorage.removeItem('Auth Token')
               
              )
              console.log('You are logged out')
            } catch(e) {
              console.log(e.message);
            
            }
          };
    
    
    
        
        
          const [open, setOpen] = useState(false);
          const [position, setPosition] = useState({ x: 0, y: 0 });

          const [inputText, setInputText] = useState();
          
          const [showTooltip, setShowTooltip] = useState(false);


        console.log(open)
          const handleClickOpen  = (event) => {
            setOpen(!open);
            setPosition({ x: event.clientX, y: event.clientY });
          };
        
          const handleClose = () => {
            setOpen(false);
          };
       
          const handleClick = (event) => {
            setShowTooltip(true);
            setPosition({ x: event.clientX, y: event.clientY });
          };
        
          useEffect(() => {
            if (showTooltip) {
              document.addEventListener('click', handleClick);
            } else {
              document.removeEventListener('click', handleClick);
            }
            return () => {
              document.removeEventListener('click', handleClick);
            };
          }, [showTooltip]);
        

const postea=async()=>{
    const q=await addDoc(collection(db, 'comentarios'), 
    {
        autor: user.email,
        comentario: comentarioRef.current.value,
        x: position.x,
        y: position.y, 
    })
    
} 


const getComentarios =async()=>{
    const q = query(collection(db, 'comentarios'))
    await onSnapshot(q, (query)=>{
       const data=[]
       query.forEach((doc)=>{
        data.push(doc.data())
       
      }) 
      setInputText(data)
          })}  


          useEffect(()=>{
            if(!inputText){
                getComentarios()
            }
          
           
          },[inputText])
          console.log(inputText)
console.log(user.email)
console.log(position)
          
          const handleAccept = () => {
            setOpen(false);
            setShowTooltip(true);
            console.log(position)
          };
        
          const handleInputChange = (event) => {
            setInputText(event.target.value);
            console.log(inputText)
          }; 
  
  
  
  
  
  
  
    return (
    <>
    
<Box >
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <DarkModeIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                
              </Typography>
            <Button color="inherit"   onClick={handleLogout}>Salir</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>




    <Box onClick={handleClickOpen}
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh', 
            
            overflow: 'auto',
          }}
        >
         
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
            
             
  
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Comenta que debiese estar aqui</DialogTitle>
        <DialogContent>
       
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Comentario"
            type="email"
            fullWidth
            variant="standard"
           
            inputRef={comentarioRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={postea}>Subscribe</Button>
        </DialogActions>
      </Dialog>





      {inputText && inputText.map((e)=>{
return( <Tooltip
    title={`${e.autor} dice ${e.comentario}`}
    style={{
      position: 'absolute',
      left: e.x,
      top: e.y,
    }}
  >
 <ChatIcon/>
    </Tooltip>)
       

 }) }
  
          

            </Grid>
          
          </Container>
        </Box>





    </Box>
</>
  )
}
