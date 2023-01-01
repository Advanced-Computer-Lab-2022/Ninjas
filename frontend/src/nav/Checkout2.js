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

const traineeNav = {};



const steps = ['Payemnt Details', 'Confirmation'];


const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [number, setNumber] = React.useState('');
  const handleChangeNumber = (event) => {
      setNumber(event.target.value)}
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    
  };

  const params = new URLSearchParams(window.location.search);
  const courseId = params.get('courseId')
  const price= params.get('price')

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
            required
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
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
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
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {/* {products.map((product) => (
          //<ListItem key={product.name} sx={{ py: 1, px: 0 }}>
           // <ListItemText primary={product.name} secondary={product.desc} />
           // <Typography variant="body2">{product.price}</Typography>
          //</ListItem>
        ))} */}

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          {/* <Typography gutterBottom>{addresses.join(', ')}</Typography> */}
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
 
        </Grid>
      </Grid>
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
                  onClick={pay}
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