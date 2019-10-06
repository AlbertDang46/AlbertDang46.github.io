function createCalendarModal(eventClickInfo ) {
    let modal = document.getElementById('calendarModal');

    modal.innerHTML = "";

    let modalTitle = document.createElement("p");
    let modalTitleNode = document.createTextNode(eventClickInfo.event.title);
    modalTitle.appendChild(modalTitleNode);
    modal.appendChild(modalTitle);

    let eventTimeStr = FullCalendar.formatDate(eventClickInfo.event.start, {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) + " - " + FullCalendar.formatDate(eventClickInfo.event.end, {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    let modalTime = document.createElement("p");
    let modalTimeNode = document.createTextNode(eventTimeStr);
    modalTime.appendChild(modalTimeNode);
    modal.appendChild(modalTime);

    if(eventClickInfo.event.extendedProps.location) {
        let modalLocation = document.createElement("p");
        let modalLocationNode = document.createTextNode(eventClickInfo.event.extendedProps.location);
        modalLocation.appendChild(modalLocationNode);
        modal.appendChild(modalLocation);
    }

    if(eventClickInfo.event.extendedProps.description) {
        let modalDesc = eventClickInfo.event.extendedProps.description;
        modal.innerHTML += modalDesc;
    }

    if(modal.style.visibility != "visible") {
        modal.style.visibility = "visible";
        modal.style.opacity = 1;
    }
    modal.style.top = eventClickInfo.jsEvent.pageY + "px";
    modal.style.left = eventClickInfo.jsEvent.pageX + "px";    
}

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
        eventClick: function(eventClickInfo) {
            window.open(eventClickInfo.event.url, '_blank', 'width=700,height=600');
            eventClickInfo.jsEvent.preventDefault();

            // createCalendarModal(eventClickInfo);
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
        eventClick: function(eventClickInfo) {
            window.open(eventClickInfo.event.url, '_blank', 'width=700,height=600');
            eventClickInfo.jsEvent.preventDefault();

            // createCalendarModal(eventClickInfo);
        }
    });

    eventsCalendar.render();
    agendaCalendar.render();
});

