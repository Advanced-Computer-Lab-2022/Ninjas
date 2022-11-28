import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react"

const RateCourse = () => {
    const [userId, setUserId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [rating, setRating] = useState('');
    const [text, setText] = useState('');

    const handleUserId = (event) => {
        setUserId(event.target.value);
    };
    const handleCourseId = (event) => {
        setCourseId(event.target.value);
    };
    const handleRating = (event) => {
        setRating(event.target.value);
    };
    const handleText = (event) => {
        setText(event.target.value);
    };
    const submit = async () => {
        const response = await axios.post(
            `http://localhost:8000/rateCourse?userId=${userId}&courseId=${courseId}`,
            { rating, text })
            .catch((error) => alert(error.response.data.message))
        alert(response.data.message);
    }

    return (
        <div>
            Rate course
            <br></br>
            <TextField variant="filled" label="userId" onChange={handleUserId} />
            <br></br>
            <TextField variant="filled" label="courseId" onChange={handleCourseId} />
            <br></br>
            <TextField type="number" label="Rating"
                InputProps={{
                    inputProps: {
                        max: 5, min: 1
                    }
                }}
                variant="filled" onChange={handleRating} />
            <br></br>
            <TextField variant="filled" style={{ width: 500 }} label="text" onChange={handleText} />
            <Button variant="filled" onClick={submit}>Submit your rating</Button>


        </div>
    )
}
export default RateCourse