document.addEventListener('DOMContentLoaded', function() {
    let eventsCalendarEl = document.getElementById('eventsCalendar');
    let eventsCalendar = new FullCalendar.Calendar(eventsCalendarEl, {
        plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listYear'
        },
        fixedWeekCount: false,
        googleCalendarApiKey: 'AIzaSyAh9AImZEwhdMOwxaMG9Y7ksvoWGLH9L8w',
        eventSources: [
            {
                googleCalendarId: 'ckiucrwebsitecalendar@gmail.com',
                color: 'red'
            },
            {
                googleCalendarId: '80ar9i451qn8iie5ce9igq2tco@group.calendar.google.com'
            }
        ],
        eventClick: function(arg) {
            window.open(arg.event.url, '_blank', 'width=700,height=600');
            arg.jsEvent.preventDefault();
        }
    });

    let agendaCalendarEl = document.getElementById('agendaCalendar');
    let agendaCalendar = new FullCalendar.Calendar(agendaCalendarEl, {
        plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listYear'
        },
        googleCalendarApiKey: 'AIzaSyAh9AImZEwhdMOwxaMG9Y7ksvoWGLH9L8w',
        events: {
            googleCalendarId: 'ckiucrwebsitecalendar2@gmail.com',
            color: 'green'
        },
        fixedWeekCount: false,
        eventClick: function(arg) {
            window.open(arg.event.url, '_blank', 'width=700,height=600');
            arg.jsEvent.preventDefault();
        }
    });

    eventsCalendar.render();
    agendaCalendar.render();
});