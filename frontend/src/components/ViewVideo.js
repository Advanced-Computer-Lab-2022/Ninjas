import { AppBar, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import ReactPlayer from 'react-player/youtube'

const ViewVideo = () => {

    const [subtitleId, setSubtitleId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [result, setResult] = useState(null);


   


    const handleSubtitleId = (event) => {
        setSubtitleId(event.target.value);
    };
    const handleCourseId = (event) => {
        setCourseId(event.target.value);
    };

const getResult = async () => {
    const response = await axios.get(`http://localhost:8000/viewVideo?subtitleId=${subtitleId}&courseId=${courseId}`)
        .catch((error) => alert(error.response.data.message))

      setResult(response.data);
    console.log(response.data.link);
}

return (
    <div>
    <AppBar position="static">
    <Toolbar>
        <TextField variant="filled" label="subtitle ID" onChange={handleSubtitleId} />
        <TextField variant="filled" label="course ID" onChange={handleCourseId} />
    </Toolbar>
    <Button variant="filled" onClick={getResult}>Show video</Button>
</AppBar>



     { result && result.link &&
      
      <ReactPlayer url= {result.link}
      controls = {true}
      />

 
     }

    </div>

)


}
export default ViewVideo;

















