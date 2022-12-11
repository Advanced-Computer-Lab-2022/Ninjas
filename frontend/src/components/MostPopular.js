import { AppBar, CircularProgress, IconButton, InputLabel, Toolbar, Typography } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useState } from "react"

const MostPopular = () => {
    const [courses, setCourses] = useState(async () => {
        await axios.get(`http://localhost:8000/mostPopularCourses`)
            .then(res => setCourses(res.data))
            .catch((error) => {
                console.log(error)
            })
    })
    //PLEASE REMEMBER TO CHANGE THE WINDOW LOCATION HREF IN THE HOVER AREA -- RETURN FUNC
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (courses.length === 3) { //result of the backend request is ready
            setReady(true);
        }
    }, [courses])


    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    {/*Inside the IconButton, we 
           can render various icons*/}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    {/* The Typography component applies 
           default font weights and sizes */}

                    <Typography variant="h6" align="center"
                        component="div" sx={{ flexGrow: 1 }}>
                        The Most Popular Courses
                    </Typography>
                </Toolbar>
            </AppBar>
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
            {
                ready && courses.map((course) => (
                    <Box hover
                        sx={{
                            border: '1px dashed grey',
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            "&:hover": {
                                cursor: "default",
                                backgroundColor: "#f5f5f5",
                                width: "100%"
                            }
                        }}
                        onClick={() => window.location.href=`/coursePage/${course._id}`}

                    >
                        <InputLabel>{course.subject}: {course.title}</InputLabel>
                        <InputLabel>Number of registered students: {course.numberOfRegistered}</InputLabel>

                    </Box>
                ))
            }
        </div>
    )
}
export default MostPopular