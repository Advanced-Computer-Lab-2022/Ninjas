import { AppBar, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";


const RateInstructor = () => {

    const [userId, setUserId] = useState('');
    const [instructorId, setInstructorId] = useState('');
    const [ratingNumber, setRatingNumber] = useState(null);
    const [ratingText, setRatingText] = useState('');
    const [result, setResult] = useState(null);


   


    const handleUserId = (event) => {
        setUserId(event.target.value);
    };
    const handleInstructorId = (event) => {
        setInstructorId(event.target.value);
    };
    const handleRatingNumber = (event) => {
        setRatingNumber(event.target.value);
    };
    const handleRatingText = (event) => {
        setRatingText(event.target.value);
    };

const getResult = async () => {
    const response = await axios.put(`http://localhost:8000/rateInstructor?userId=${userId}&instructorId=${instructorId}&ratingNumber=${ratingNumber}&ratingText=${ratingText}`)
        .catch((error) => alert(error.response.data.message))

      setResult(response.data);
    console.log(response.data.link);


    alert( "Done" )

}

return (
    <div>
    <AppBar position="static">
    <Toolbar>
        <TextField variant="filled" label="user ID" onChange={handleUserId} />
        <TextField variant="filled" label="instructor ID" onChange={handleInstructorId} />
        <TextField variant="filled" pattern="^[0-5\b]+$"  label="rating number" onChange={handleRatingNumber} />
        <TextField variant="filled" label="description" onChange={handleRatingText} />
    </Toolbar>
    <Button variant="filled" onClick={getResult}>submit rating</Button>
</AppBar>



 

    </div>

)


}
export default RateInstructor;


















