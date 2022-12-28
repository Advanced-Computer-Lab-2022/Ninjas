import { AppBar, Button, CircularProgress, Container, createTheme, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, Slider, TextField, ThemeProvider, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import ReactPlayer from 'react-player/youtube'
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer'
import { useEffect } from "react";
import TraineeNav from '../nav/TraineeNav';

const mdTheme = createTheme();
const ViewVideo = () => {

    const params = new URLSearchParams(window.location.search);
    const subtitleId = params.get('subtitleId');
    const courseId = params.get('courseId');

    const [notes, setNotes] = useState('');
    const [ready, setReady] = useState(false);

    const handleNotes = (event) => {
        setNotes(event.target.value);
    };

    const [result, setResult] = useState(async () => {
        const response = await axios.get(`http://localhost:8000/viewVideo?subtitleId=${subtitleId}&courseId=${courseId}`)
            .catch((error) => alert(error.response.data.message))

        setResult(response.data);
    })

    useEffect(() => {
        if (result.link) {
            setReady(true);
        }

    }, [result])

    const MyDoc = () => (
        <Document>
            <Page>
                <Text>{notes}</Text>
            </Page>
        </Document>
    )

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <TraineeNav post={{}} />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: '#ffffff',
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 2, mb: 2 }}>
                        <Grid container spacing={3}>

                        </Grid>
                    </Container>

                    {
                        !ready &&
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            minHeight="100vh"
                        >
                            <CircularProgress />
                        </Box>

                    }
                    {ready && result.link &&
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <ReactPlayer url={result.link}
                                controls={true}
                            />
                            <TextField multiline fullWidth label="Write some notes" focused sx={{ mt: 1}} onChange={handleNotes} />

                            <PDFDownloadLink document={<MyDoc />} fileName="notes.pdf">
                                    <Button size="large"
                                        sx={{ mt: 1, mb: 1, ml: 1, display: 'flex', flexDirection: 'column', color: 'black', backgroundColor: '#CAF0F8', borderColor: '#CAF0F8' }}
                                    > Download notes </Button>
                            </PDFDownloadLink>

                        </Box>
                    }
                </Box>
            </Box>
        </ThemeProvider>

    )


}
export default ViewVideo;

















