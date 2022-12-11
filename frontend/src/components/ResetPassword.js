import { Alert, AppBar, Button, FormControl, IconButton, Input, InputLabel, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router";

const ResetPasswordPage = () => {
    const { id: userId } = useParams();
    const [password, setPassword] = useState('');
    const [confirmedPassword, setconfPassword] = useState('');
    const [changed, setChanged] = useState(false);


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setconfPassword(event.target.value);
    };

    const resetPass = async () => {
        if (!password || password.trim().length == 0)
            return alert('Please enter a password.');

        if (password != confirmedPassword)
            return alert('Please make sure that both passwords match.');

        const response = await axios.post(`http://localhost:8000/resetPassword/${userId}`, { password })
            .catch((error) => {
                console.log(error)
                alert(error.response.data.message)
            })

        if (response.status == 201)
            setChanged(true);

    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    {/*Inside the IconButton, we 
           can render various icons*/}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    {/* The Typography component applies 
           default font weights and sizes */}

                    <Typography variant="h6" align="center"
                        component="div" sx={{ flexGrow: 1 }}>
                        Reset your password
                    </Typography>
                </Toolbar>
            </AppBar>
            <br></br>
            <Box
                sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    marginRight: 40,
                    marginLeft: 40,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handlePasswordChange}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="cpassword"
                    label="Confirm Password"
                    type="password"
                    id="cpassword"
                    onChange={handleConfirmPasswordChange}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: '#00B4D8' }}
                    onClick={resetPass}
                > Reset my Password </Button>
                {
                    changed &&
                    <Alert
                        action={
                            <Button color="inherit" size="medium" onClick={() => window.location.href = `/`}
                            >
                            GO TO LOGIN
                            </Button>
                        }
                    >
                        Your password has been changed successfully.
                    </Alert>}

            </Box>

        </div>
    )
}
export default ResetPasswordPage;