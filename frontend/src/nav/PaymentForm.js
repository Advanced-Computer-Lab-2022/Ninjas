import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

export default function PaymentForm() {
  const [name, setName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [exDate, setExDate] = React.useState('');
  const [cvv, setCVV] = React.useState('');
  const handleChangeName= (event) => {
    setName(event.target.value)}
  const handleChangeNumber = (event) => {
      setNumber(event.target.value)}
  const handleChangeExDate = (event) => {
      setExDate(event.target.value)}
  const handleChangeCVV = (event) => {
        setCVV(event.target.value)}
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(event)=>{handleChangeName(event)}}
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
          onChange={(event)=>{handleChangeExDate(event)}}
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
          onChange={(event)=>{handleChangeCVV(event)}}
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
    </React.Fragment>
  );
}