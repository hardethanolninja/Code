function getNpsotCal() {
  const calId =
    "@group.calendar.google.com";
  const key = "";

  const loadEvents = async () => {
    try {
      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/" +
          calId +
          "/events?key=" +
          key
      );
      const json = await res.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  loadEvents();
}

getNpsotCal();
