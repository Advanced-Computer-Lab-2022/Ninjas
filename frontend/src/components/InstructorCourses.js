import { AppBar, Button, IconButton, Slider, TextField, Toolbar } from "@mui/material";
import { useState } from "react";

const InstructorCourses = () => {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
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

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <TextField variant="filled" label="Title" onChange={handleTitleChange} />
                    <TextField variant="filled" label="Subject" onChange={handleSubjectChange} />
                    <TextField type="number" label="Minimum Price" variant="filled" onChange={handleMinPrice} />
                    <TextField type="number" label="Maximum Price" variant="filled" onChange={handleMaxPrice} />
                </Toolbar>
                <Button variant="filled">Search</Button>

            </AppBar>
        </div>
    )
}
export default InstructorCourses;