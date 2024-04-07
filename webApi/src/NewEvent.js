import * as React from 'react';
import { TextField } from "@mui/material";
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom/dist';
import {  useParams } from "react-router-dom";
import { EventPost } from "./axios/APIcalls/EventsAPI";
import moment from "moment/moment";
import { EventGet } from './axios/APIcalls/EventsAPI';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

const NewEvent = () => {
  const [Title, setTitle] = useState('');
  const [EventId1, setEventId1] = useState('');
  const [Description, setDescription] = useState('');
  const [StartDate, setStartDate] = useState(moment());
  const [EndDate, setEndDate] = useState(moment());

  const formatDate = (datetimeString) => {
    const originalDate = new Date(datetimeString);
    const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
    const day = originalDate.getDate().toString().padStart(2, '0');
    const year = originalDate.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
    return formattedDate;
  };

  const { eventPar } = useParams();
  const loadEvents = async() => {
    const UserId=localStorage.getItem('userId')
    await EventGet(UserId).then((response) => {
        if (response.data.value) {
            const ev=response.data.value.filter(e=>e.eventId==parseInt(eventPar.split(' ')[1]))[0]
            setEventId1(ev.eventId)
            setTitle(ev.title)
            setDescription(ev.description)
            setStartDate(moment(formatDate(ev.startDate)))
            setEndDate(moment(formatDate(ev.endDate)))
        }
    })
}

  const navigate = useNavigate()
  const saveEvent = () => {
    let EventId = 1
    if (EventId1!="") {
      EventId = EventId1;
    }
    else {
      EventId=Math.floor(Math.random()*10000)
    }
    setEventId1(EventId)
    const UserId = localStorage.getItem('userId')
    const event = { EventId, UserId, Title, Description, StartDate, EndDate }
    if (event.Description !== undefined) {
      EventPost(event).then((response) => {
        if (response.data.statusCode === 200) {
          alert("Event added successfully:)")
          navigate('/Calendar', { replace: false })
        }
      })
    }
  }

  useEffect(() => {
    if (eventPar){
      if(eventPar.startsWith('date')){
        setStartDate(moment(formatDate(eventPar.split(' ')[1])))
        setEndDate(moment(formatDate(eventPar.split(' ')[1])))
      }
      else{
        loadEvents()
      }
    }
  }, [])

  const cancelEvent = () => {
    navigate('/Calendar', {replace: false })
  }
  
  return (
  <div className={"mainContainer"}>
    <TextField
      required
      label="Event Title"
      value={Title}
      onChange={e => setTitle(e.target.value)}
    /><br/>
    <TextField
      required
      label="Event Description"
      value={Description}
      onChange={e => setDescription(e.target.value)}

    />
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DemoContainer
        components={[
          'DatePicker',
          'TimePicker',
          'DateRangePicker',
        ]}
      >
        <DemoItem label="DatePicker">
          <DatePicker
            value={StartDate}
            enableFuture
            views={['year', 'month', 'day']}
            onChange={date => setStartDate(date)}
          />
        </DemoItem>

        <DemoItem label="DateRangePicker" component="DateRangePicker">
          <DatePicker
            value={EndDate}
            disablePast
            enableFuture
            views={['year', 'month', 'day']}
            onChange={date => setEndDate(date)}
          />
        </DemoItem>
      </DemoContainer>

    </LocalizationProvider>
    <button onClick={saveEvent}>Save Event</button>
    <button onClick={cancelEvent}>Cancel Event</button>

  </div>
  )
}
export default NewEvent;