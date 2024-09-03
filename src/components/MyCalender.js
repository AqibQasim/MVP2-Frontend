import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import '../styles/calender.css'

const MyCalendar = () => {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      weekends={true}
      events={[
        { title: 'event 1', date: '2020-05-01' },
        { title: 'event 2', date: '2020-05-02' }
      ]}
    />
  );
};

export default MyCalendar;
