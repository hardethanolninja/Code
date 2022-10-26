function getNpsotCal() {
  const calId =
    "5e96cd7634f48f3e48aff806fa88204965375b5c240328b6e33721678c1fc7cb@group.calendar.google.com";
  const key = "AIzaSyCZRq5UApQW15A5eOm61j1yfE0gNArXW8c";

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
