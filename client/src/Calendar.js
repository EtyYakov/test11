import moment from 'moment/moment';
import Day from './Day';
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { EventGet } from './axios/APIcalls/EventsAPI'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';

const Calendar = () => {
    const [weekIndex, setWeekIndex] = useState(0);
    const [Events, setEvents] = useState([])
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const UserId = localStorage.getItem("userId")
    const navigate = useNavigate();

    const handleChange = (event) => {
        setAuth(event.target.checked);
        navigate("../Login", { replace: false })
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const loadEvents = async () => {
        const UserId = localStorage.getItem("userId")
        await EventGet(UserId).then((response) => {
            if (response.data.value) {
                setEvents(response.data.value);
            }
        })
    }

    useEffect(() => {
        loadEvents();
    }, [])

    const path = () => {
        navigate('/NewEvent', { replace: false })
    };

    function changeUser() {
        navigate("/", { replace: false })
    };

    const days = [0, 1, 2, 3, 4, 5, 6]
    return (<>

        <Box sx={{ flexGrow: 1 }}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={auth}
                            onChange={handleChange}
                            aria-label="login switch"
                        />
                    }
                    label={auth ? 'Logout' : 'Login'}

                />
            </FormGroup>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1 }}>
                        <Stack dspacing={2} direction="row"  >
                            <Button className={"inputContainer"} background-color="transparent">
                                <input
                                    className={"inputButton"}
                                    type="button"
                                    onClick={path}
                                    variant="text"
                                    value={"New event"} />

                            </Button>
                            <div className={"inputContainer"}>
                                <input
                                    className={"inputButton"}
                                    type="button"
                                    onClick={() => setWeekIndex(0)}
                                    value={"Go to today"} />
                            </div>
                            <div className={"inputContainer"}>
                                <input
                                    color='FFFFFF'
                                    className={"inputButton"}
                                    type="button"
                                    onClick={() => setWeekIndex(weekIndex - 7)}
                                    value={"◀"} />
                            </div>
                            <div className={"inputContainer"}>
                                <input
                                    color='FFFFFF'
                                    className={"inputButton"}
                                    type="button"
                                    onClick={() => setWeekIndex(weekIndex + 7)}
                                    value={"▶"} />
                            </div>
                            <Box
                                sx={{
                                    '& > legend': { mt: 2 },
                                }}
                            >
                                <Typography component="legend">Love</Typography>
                                <Rating
                                    name="simple-controlled"
                                />

                            </Box>
                        </Stack>

                    </Typography>
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            {UserId}
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => changeUser()}>My account</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>

        {
            <div className='Week'>
                <Box sx={{ flexGrow: 1, textAlign: 'center', justifyContent: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', top: '100%', marginTop: '5%' }}>
                    <Grid container spacing={2}>
                        {days.map((dayI) =>
                            <Grid>
                                <Day
                                    d={moment().day(weekIndex + dayI).format("MM-DD-yyyy")}
                                    setWeekIndex={setWeekIndex}
                                    loadEvents={loadEvents}
                                    events={Events.filter(e =>
                                        moment(e.startDate).format("DD-MM-yyyy") <= moment().day(weekIndex + dayI).format("DD-MM-yyyy")
                                        && moment(e.endDate).format("DD-MM-yyyy") >= moment().day(weekIndex + dayI).format("DD-MM-yyyy"))}
                                    key={dayI} date={moment().day(weekIndex + dayI)} />
                            </Grid>)}
                    </Grid>
                </Box>
            </div>
        }
    </>)
}
export default Calendar;