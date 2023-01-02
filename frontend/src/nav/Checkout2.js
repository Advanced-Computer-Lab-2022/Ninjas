import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PaymentForm from './PaymentForm';
import Review from './Review';
import TraineeNav from './TraineeNav';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { styled} from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
const traineeNav = {};



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
const steps = ['Payemnt Details', 'Confirmation'];


const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [number, setNumber] = React.useState('');
  const [card, setCard] = React.useState('');
  const [exp, setExp] = React.useState('');
  const [cvv, setCVV] = React.useState('');
  const [first2, setFirst2] = React.useState(0);
  const handleChangeNumber = (event) => {
      setNumber(event.target.value)}

  const handleChangeCard = (event) => {
    setCard(event.target.value)}
  
  const handleChangeExp = (event) => {
    setExp(event.target.value)}
  const handleChangeCVV = (event) => {
      setCVV(event.target.value)}

  const handleNext = () => {
    setFirst2(1);
    if(number.length==16 && card!='' && exp!='' && cvv.length==3)
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    
  };

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId')
  const price= params.get('price')
  const courseName= params.get('courseName')

  const pay = async () => {
    const response = await axios.post(`http://localhost:8000/payForCourse2`, {
            courseId: courseId,
            cardNo:number
        }).catch(error => {
            if(error.response.status === 400) {
            }
        })

        if (response.status === 200) {
            window.location.href=`course/${courseId}`
        }
  
    }
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (reqIdInput) => {
      setOpen(true);
    };
    const handleClose = async () => {
      setOpen(false);
    };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Box sx={{ display: 'flex'  }}>
        
          <CssBaseline />
          <TraineeNav post={traineeNav}/>
          
          <Box
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
      &nbsp;&nbsp;&nbsp;
      <Container component="main" maxWidth="sm" sx={{ mt: 10 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
              </Stepper>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {activeStep===0?(<React.Fragment>
     
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
      <Typography variant="h6"  >
        Payment method
      </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
      <Typography variant="h6"  >
      </Typography>
      </Grid>
        <Grid item xs={12} md={6}>
        
          <TextField
          onChange={(event)=>{handleChangeCard(event)}}
          error={first2==1 && card==''}
          required
          helperText={  first2==1 && card==''? "Cannot leave text field empty" : null}
          id="cardName"
          label="Name on card"
          fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          onChange={(event)=>{handleChangeNumber(event)}}
          error={first2==1 && number.length!=16}
          required
          helperText={  first2==1 && number.length!=16? "Card number must be 16 characters" : null}
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          onChange={(event)=>{handleChangeExp(event)}}
          error={first2==1 && exp==''}
          required
          helperText={  first2==1 && exp.length==''? "Must write expiry date" : null}
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          onChange={(event)=>{handleChangeCVV(event)}}
          error={first2==1 && cvv.length!=3}
          required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
       
      </Grid>
    </React.Fragment>):(<React.Fragment>
      <Paper
                                sx={{
                                    position: 'relative',
                                    color: '#000',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right',
                                    backgroundSize: '20%',

                                }}
                            >
                          
<Grid >


          <Typography display="inline" variant="subtitle1" sx={{ fontWeight: 700 , display: "flex", alignItems: "center"}}>
           Total:  {price}
          </Typography>
          </Grid>

          <Grid >



          <Typography  variant="subtitle1" sx={{ fontWeight: 700,  display: "flex",alignItems: "center"}}>
          Course Name:   {courseName}
          </Typography>
          
          </Grid>
          </Paper>
         

          <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
        <Typography gutterBottom component="h1" variant="h5" sx={{color:'#03045E'}}>
          Alert
        </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Are you sure you want to pay for course?
          </Typography>   
        </DialogContent>
        <DialogActions>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={() => handleClose()}>
            No
          </Button>
          <Button autoFocus sx={{ color: '#CAF0F8', backgroundColor: '#03045E', borderColor: '#03045E'  }} 
          onClick={pay}>
            Yes
          </Button>
        </DialogActions>
      </BootstrapDialog>

    </React.Fragment>)}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}


                  {activeStep === steps.length - 1 ? 
                  <Button
                  variant="contained"
                  //onClick={pay}
                  onClick={handleClickOpen}
                  sx={{ mt: 3, ml: 1 }}>
                    Register Now
                  </Button>
                : <Button
                variant="contained"
                onClick={handleNext}
                sx={{ mt: 3, ml: 1 }}>
                  Next
                </Button>}

              </Box>
            </React.Fragment>
          )}
        </Paper>
      
      </Container>
      </Box>
      </Box>
    </ThemeProvider>
  );
}