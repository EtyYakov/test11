import * as React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ContextMenu from "./ContextMenuFolder/ContextMenu";
import { useNavigate } from 'react-router-dom';
import { EventDelete } from './axios/APIcalls/EventsAPI';
const Day = (props) => {
    const [currEv,setCurrEv]=React.useState({})
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const componentToSetMenu = () => {
        return (
            <div style={{ display: 'inline-block' }} className='day'>
                <div style={{ borderStyle: 'groove', width: '250px', height: '600px' }}>
                    <h2 style={{ textAlign: 'center' }}>{`${props.date.format("dddd MMM, D")} `}</h2>
                    <div className="eventList" l>
                        {props.events.length > 0 ?
                            props.events.map((e) => <div>
                                <Button variant="outlined" onClick={()=>handleClickOpen(e)} style={{ width: "220px" }}>
                                    {e.title}
                                </Button>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">
                                        {currEv.title}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                            {currEv.description}
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <IconButton aria-label="Set" onClick={() => handleSet(e)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={() => handleDelete(e)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </DialogActions>
                                </Dialog>
                            </div>) : <></>}

                    </div >
                </div>

            </div>
        )
    }
    const handleClickOpen = (e) => {
        setCurrEv(e)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSet = (e) => {
        setOpen(false);
        navigate(`/NewEvent/event ${currEv.eventId}`, { replace: false })
    }

    const handleDelete = (e) => {
        setOpen(false);
        EventDelete(e.eventId).then((response) => {
            if (response.data.statusCode === 200) {
                alert("Event deleted successfully:)")
                props.loadEvents();
                navigate('/Calendar', { replace: false })
            }
        })
    }

    return (

        <ContextMenu d={props.d} contextComponent={componentToSetMenu} setWeekIndex={props.setWeekIndex}> </ContextMenu>
    )

}
export default Day;
