import { AppBar, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

const ViewExerciseGrade = () => {
   
const [exerciseId, setExerciseId] = useState('');
const [userId, setUserId] = useState('');
const [result, setResult] = useState(null);



const handleUserId = (event) => {
    setUserId(event.target.value);
};
const handleExerciseId = (event) => {
    setExerciseId(event.target.value);
};


const getResult = async () => {
    const response = await axios.get(`http://localhost:8000/viewExerciseGrade?exersiseId=${exerciseId}&userId=${userId}`)
        .catch((error) => alert(error.response.data.message))

      setResult(response.data);
    console.log(response.data);
}

return (
    <div>
        <AppBar position="static">
            <Toolbar>
                <TextField variant="filled" label="user ID" onChange={handleUserId} />
                <TextField variant="filled" label="exercise ID" onChange={handleExerciseId} />
            </Toolbar>
            <Button variant="filled" onClick={getResult}>Show grade</Button>
        </AppBar>

        {result && result.solved&&
              <FormControl>
              <FormLabel id="label">{ "You got "+ result.userGrade + " out of " + result.totalGrade}</FormLabel>
          </FormControl>
        
        }
        {result && !result.solved&&

          <FormControl>
              <FormLabel id="label">{"You still did not solve the exercise"}</FormLabel>
          </FormControl>
         

        }
        

       
    </div>
)


}
export default ViewExerciseGrade;

















