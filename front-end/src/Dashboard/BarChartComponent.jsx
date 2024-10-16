import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { indexbooking } from '../api/bookings';
import { Box, Popover, Typography } from "@mui/material";

const localizer = momentLocalizer(moment);

function CustomToolbar(toolbar) {
  const goToBack = () => {
    let mDate = toolbar.date;
    let newDate = new Date(mDate.setMonth(mDate.getMonth() - 1));
    toolbar.onNavigate('prev', newDate);
  };

  const goToNext = () => {
    let mDate = toolbar.date;
    let newDate = new Date(mDate.setMonth(mDate.getMonth() + 1));
    toolbar.onNavigate('next', newDate);
  };

  const goToCurrent = () => {
    let now = new Date();
    toolbar.onNavigate('current', now);
  };

  return (
    <Box className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button type="button" onClick={goToCurrent}>
          Today
        </button>
        <button type="button" onClick={goToNext}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
    </Box>
  );
}

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const user = useSelector((state) => state.auth.user); 
  const [cookies] = useCookies(["AUTH_TOKEN"]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await indexbooking(cookies.AUTH_TOKEN);
        const bookings = response.data;

        const events = bookings.map(booking => {
    
         

          return {
            id: booking.id,
           
            start: new Date(booking.check_in_date),
            end: new Date(booking.check_out_date),
            allDay: true,
            resource: booking 
          
          };
        });

        setEvents(events);
      } catch (error) {
        console.log(userName)
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [cookies.AUTH_TOKEN, user?.profile?.name]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#3174ad',
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '1px solid #285e8e',
      display: 'block'
    };

    return {
      style
    };
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleClosePopover = () => {
    setSelectedEvent(null);
  };

  return (
    <Box sx={{ height: '100vh', width: "100%" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={handleEventClick}
        components={{
          toolbar: CustomToolbar,
        }}
      />
      <Popover
        open={!!selectedEvent}
        anchorEl={selectedEvent ? selectedEvent.target : null}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedEvent && (
          <Box p={2}>
            <Typography variant="body1">Booking ID: {selectedEvent.resource.id}</Typography>
            <Typography variant="body1">Check-in: {moment(selectedEvent.resource.check_in_date).format('MMMM Do YYYY, h:mm a')}</Typography>
            <Typography variant="body1">Check-out: {moment(selectedEvent.resource.check_out_date).format('MMMM Do YYYY, h:mm a')}</Typography>
          </Box>
        )}
      </Popover>
    </Box>
  );
}

export default MyCalendar;
