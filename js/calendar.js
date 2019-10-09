document.addEventListener('DOMContentLoaded', function() {
    let eventsCalendarEl = document.getElementById('eventsCalendar');
    let eventsCalendar = new FullCalendar.Calendar(eventsCalendarEl, {
        plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
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
            eventClickInfo.jsEvent.preventDefault();
            createCalendarModal(eventClickInfo);
        }
    });

    let agendaCalendarEl = document.getElementById('agendaCalendar');
    let agendaCalendar = new FullCalendar.Calendar(agendaCalendarEl, {
        plugins: [ 'dayGrid', 'list', 'googleCalendar' ],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,listMonth'
        },
        googleCalendarApiKey: 'AIzaSyAh9AImZEwhdMOwxaMG9Y7ksvoWGLH9L8w',
        events: {
            googleCalendarId: 'ckiucrwebsitecalendar2@gmail.com',
            color: 'green'
        },
        fixedWeekCount: false,
        eventClick: function(eventClickInfo) {
            eventClickInfo.jsEvent.preventDefault();
            createCalendarModal(eventClickInfo);
        }
    });

    eventsCalendar.render();
    agendaCalendar.render();

    window.addEventListener('click', function(event) {
        let modal = document.getElementById('calendarModal');

        if(!modal.contains(event.target) && 
            !event.target.classList.contains("fc-title") && 
            !event.target.classList.contains("fc-time") && 
            !event.target.classList.contains("fc-content") &&
            !event.target.classList.contains("fc-list-item") &&
            !event.target.classList.contains("fc-list-item-time") &&
            !event.target.classList.contains("fc-list-item-marker") &&
            !event.target.classList.contains("fc-list-item-title") &&
            !event.target.classList.contains("fc-event-dot")
        ) {
            modal.style.opacity = 0;
            modal.style.pointerEvents = "none";
        }
    });
});

function createCalendarModal(eventClickInfo ) {
    let modal = document.getElementById('calendarModal');
    let modalTitle = document.getElementById('calendarModalTitle');
    let modalTime = document.getElementById('calendarModalTime');
    let modalLocation = document.getElementById('calendarModalLocation');
    let modalDesc = document.getElementById('calendarModalDesc');

    modalTitle.innerHTML = "";
    modalTime.innerHTML = "";
    modalLocation.innerHTML = "";
    modalDesc.innerHTML = "";

    modalTitle.innerHTML = eventClickInfo.event.title;

    let eventTimeStr = FullCalendar.formatDate(eventClickInfo.event.start, {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    }) + " - " + FullCalendar.formatDate(eventClickInfo.event.end, {
        weekday: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    modalTime.innerHTML = eventTimeStr;

    if(eventClickInfo.event.extendedProps.location) {
        modalLocation.innerHTML = eventClickInfo.event.extendedProps.location;
    }

    if(eventClickInfo.event.extendedProps.description) {
        let modalDescStr = eventClickInfo.event.extendedProps.description;
        modalDesc.innerHTML = getLinkTag(modalDescStr);
    }

    modal.style.opacity = 1;
    modal.style.pointerEvents = "auto";
    modal.style.top = eventClickInfo.jsEvent.pageY + "px";
    modal.style.left = eventClickInfo.jsEvent.pageX + "px";  
    console.log(modal.style.opacity);
}

function getLinkTag(desc) {
    let newLink = "";

    if(desc.includes('</a>')) {
        newLink = desc.slice(0, 2) + " target=\"_blank\"" + desc.slice(2);
        return newLink;
    }

    newLink = desc.replace(/(?:(https?\:\/\/[^\s]+))/m, '<a href="$1" target="_blank">$1</a>');
    return newLink;
}

