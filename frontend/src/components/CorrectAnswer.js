import { AppBar, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

const CorrectAnswer = () => {
    const [exerciseId, setExerciseId] = useState('');
    const [subtitleId, setSubtitleId] = useState('');
    const [courseId, setCourseId] = useState('');
 
    const [exercise, setExercise] = useState(null)

  

    const handleSubtitleId = (event) => {
        setSubtitleId(event.target.value);
    };
    const handleExerciseId = (event) => {
        setExerciseId(event.target.value);
    };
    const handleCourseId = (event) => {
        setCourseId(event.target.value);
    };
    const getExercise = async () => {
        const response = await axios.get(`http://localhost:8000/viewCorrectAnswers?subtitleId=${subtitleId}&exersiseId=${exerciseId}&courseId=${courseId}`)
            .catch((error) => alert(error.response.data.message))

        setExercise(response.data.exercises)
        console.log(response.data.exercises);
    }

   
    useEffect(() => {
    }, [exercise])
    

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <TextField variant="filled" label="course ID" onChange={handleCourseId} />
                    <TextField variant="filled" label="subtitle ID" onChange={handleSubtitleId} />
                    <TextField variant="filled" label="exercise ID" onChange={handleExerciseId} />
                </Toolbar>
                <Button variant="filled" onClick={getExercise}>Show answers</Button>
            </AppBar>

            {exercise && exercise.questions.map((question) => (

                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">{question.questionText}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="controlled-radio-buttons-group"
                       
                    >
                        <FormControlLabel value={question.mcqs[0]} control={<Radio />} label={question.mcqs[0]} />
                        <FormControlLabel value={question.mcqs[1]} control={<Radio />} label={question.mcqs[1]} />
                        <FormControlLabel value={question.mcqs[2]} control={<Radio />} label={question.mcqs[2]} />
                        <FormControlLabel value={question.mcqs[3]} control={<Radio />} label={question.mcqs[3]} />

                    </RadioGroup>
                    <FormLabel id="label">{"The correct answer is: "}</FormLabel>
                    <FormLabel id="answer">{question.correctAnswer}</FormLabel>
                </FormControl>
            )
            )}

            <br></br>

           
        </div>
    )
}
export default CorrectAnswer;