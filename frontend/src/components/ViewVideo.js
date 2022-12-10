import { AppBar, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, Slider, TextField, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import ReactPlayer from 'react-player/youtube'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'

const ViewVideo = () => {

    const [subtitleId, setSubtitleId] = useState('');
    const [courseId, setCourseId] = useState('');
    const [result, setResult] = useState(null);
    const [notes, setNotes] = useState('');

    const handleSubtitleId = (event) => {
        setSubtitleId(event.target.value);
    };
    const handleCourseId = (event) => {
        setCourseId(event.target.value);
    };
    const handleNotes = (event) => {
        setNotes(event.target.value);
    };

    const getResult = async () => {
        const response = await axios.get(`http://localhost:8000/viewVideo?subtitleId=${subtitleId}&courseId=${courseId}`)
            .catch((error) => alert(error.response.data.message))

        setResult(response.data);
        console.log(response.data.link);
    }

    const MyDoc = () => (
        <Document>
            <Page>
                <Text>{notes}</Text>
            </Page>
        </Document>
    )

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <TextField variant="filled" label="subtitle ID" onChange={handleSubtitleId} />
                    <TextField variant="filled" label="course ID" onChange={handleCourseId} />
                </Toolbar>
                <Button variant="filled" onClick={getResult}>Show video</Button>
            </AppBar>



            {result && result.link &&
                <div>
                    <ReactPlayer url={result.link}
                        controls={true}
                    />
                    <TextField multiline fullWidth label="Write some notes" focused sx={{ mt: 1 }} onChange={handleNotes} />

                    <PDFDownloadLink document={<MyDoc />} fileName="notes.pdf">
                        {({ blob, url, loading, error }) => (loading ? 'Loading document...' :
                            <Button variant="contained" sx={{ mt: 1 }}> Download notes </Button>)}
                    </PDFDownloadLink>

                </div>
            }

        </div>

    )


}
export default ViewVideo;

















