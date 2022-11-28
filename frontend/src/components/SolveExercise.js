import { AppBar, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";

const SolveExercise = () => {
    const [userId, setUserId] = useState('');
    const [exerciseId, setExerciseId] = useState('');
    const [exerciseQuestions, setExerciseQuestions] = useState([]);
    const [exercise, setExercise] = useState(null)

    const [userAnswers, setUserAnswers] = useState([])

    const handleUserId = (event) => {
        setUserId(event.target.value);
    };
    const handleExerciseId = (event) => {
        setExerciseId(event.target.value);
    };
    const getExercise = async () => {
        const response = await axios.get(`http://localhost:8000/solveExercise?userId=${userId}&exerciseId=${exerciseId}`)
            .catch((error) => alert(error.response.data.message))

        setExercise(response.data)
        console.log(response.data.questions);
    }

    const submit = async () => {
        //the user answers are set in the radio button onChange function
        const submitExercise = await axios.post(`http://localhost:8000/submitExercise?userId=${userId}`
        , {solvedExercise: exercise} )
        .catch((error) => alert(error.response.data.message))

        alert("Your solution has been submitted \nYour grade: "
        + submitExercise.data.userGrade
        + " out of " + exercise.totalGrade
        + "\nwhich is " + submitExercise.data.gradePercentage + "%")
    }

    useEffect(() => {
    }, [exercise])

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <TextField variant="filled" label="user ID" onChange={handleUserId} />
                    <TextField variant="filled" label="exercise ID" onChange={handleExerciseId} />
                </Toolbar>
                <Button variant="filled" onClick={getExercise}>Start Solving</Button>
            </AppBar>

            {exercise.questions.map((question) => (
                <FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">{question.questionText}</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="controlled-radio-buttons-group"
                        onChange={(event) => question.userAnswer = event.target.value}
                    >
                        <FormControlLabel value={question.mcqs[0]} control={<Radio />} label={question.mcqs[0]} />
                        <FormControlLabel value={question.mcqs[1]} control={<Radio />} label={question.mcqs[1]} />
                        <FormControlLabel value={question.mcqs[2]} control={<Radio />} label={question.mcqs[2]} />
                        <FormControlLabel value={question.mcqs[3]} control={<Radio />} label={question.mcqs[3]} />

                    </RadioGroup>
                </FormControl>
            )
            )}

            <br></br>

            {exercise.questions.length > 0 &&
                <Button variant="contained" onClick={submit} >Submit</Button>

            }
        </div>
    )
}
export default SolveExercise;