import { AppBar, Button, TextField, Toolbar } from "@mui/material";
import axios from "axios";
import { useState } from "react";

//INDIVIDUAL TRAINEE SEARCH
const TraineeSearch = () => {
    const userId = "635bcbc0b433a250dfd838a8";

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [instructor, setInstructor] = useState('');
    const [rating, setRating] = useState('');
    const [totalHours, setTotalHours] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };
    const handleSubjectChange = (event) => {
        setSubject(event.target.value);
    };
    const handleMinPrice = (event) => {
        setMinPrice(event.target.value);
    };
    const handleMaxPrice = (event) => {
        setMaxPrice(event.target.value);
    };
    const handleRating = (event) => {
        setRating(event.target.value);
    };
    const handleTotalHours = (event) => {
        setTotalHours(event.target.value);
    };
    const handleInstructorChange = (event) => {
        setInstructor(event.target.value);
    };

    const getSearchRes = async () => {
        // let body = {
        //     userId, subject, minPrice, maxPrice, rating, title, instructor, totalHours
        // }
        // console.log(body);
        const results = await axios.get(`http://localhost:8000/search?
        userId=${userId}&
        subject=${subject}&
        minPrice=${minPrice}&
        maxPrice=${maxPrice}&
        rating=${rating}&
        title=${title}&
        instructor=${instructor}&
        totalHours=${totalHours}
        `);
        console.log(results)
    }
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <TextField variant="filled" label="Title" onChange={handleTitleChange} />
                    <TextField variant="filled" label="Subject" onChange={handleSubjectChange} />
                    <TextField variant="filled" label="Instructor" onChange={handleInstructorChange} />
                    <TextField type="number" label="Minimum Price" variant="filled" onChange={handleMinPrice} />
                    <TextField type="number" label="Maximum Price" variant="filled" onChange={handleMaxPrice} />
                    <TextField type="number" label="Rating"
                        InputProps={{
                            inputProps: {
                                max: 5, min: 1
                            }
                        }}
                        variant="filled" onChange={handleRating} />

                    <TextField type="number" label="Total Hours"
                        InputProps={{
                            inputProps: {
                                min: 0
                            }
                        }}
                        variant="filled" onChange={handleTotalHours} />

                </Toolbar>
                <Button variant="filled" onClick={getSearchRes}>Search</Button>

            </AppBar>
        </div>
    )
}
export default TraineeSearch;