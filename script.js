const now = moment();

//to display current time
$("#currentDay").text(now.format("dddd, MMMM Do"));

const workTime = [
  { time: "9AM", event: "" },
  { time: "10AM", event: "" },
  { time: "11AM", event: "" },
  { time: "12AM", event: "" },
  { time: "1PM", event: "" },
  { time: "2PM", event: "" },
  { time: "3PM", event: "" },
  { time: "4PM", event: "" },
  { time: "5PM", event: "" },
];

function init() {
  let times = [];
  if (!localStorage.getItem("planner")) {
    localStorage.setItem("planner", JSON.stringify(workTime));
    times = workTime;
  } else {
    times = JSON.parse(localStorage.getItem("planner"));
  }
  let time = "";
  let event = "";
  times.forEach((item, index) => {
    // $("div").attr("id",`item-${index+1}`)
    const h5 = $("<span />").text(item.time).addClass("hour");
    let currentHour = now.format("hA");
    let h4;
    if (currentHour > 12) {
      currentHour -= 12;
    }
    const currentTime = moment(currentHour, "hA");
    const itemTime = moment(item.time, "hA");
    console.log(currentTime.isBefore(itemTime), item.time, currentHour);
    if (!currentTime.isBefore(itemTime) && item.time !== currentHour) {
      h4 = $("<textarea />")
        .text(item.event)
        .addClass("past")
        .change((e) => {
          time = item.time;
          event = e.target.value;
        });
    } else if (!currentTime.isBefore(itemTime)) {
      h4 = $("<textarea />")
        .text(item.event)
        .addClass("present")
        .change((e) => {
          time = item.time;
          event = e.target.value;
        });
    } else {
      h4 = $("<textarea />")
        .text(item.event)
        .addClass("future")
        .change((e) => {
          time = item.time;
          event = e.target.value;
        });
    }
    const i = $("<i><i />").addClass("fas fa-save");
    const button = $("<button />")
      .addClass("saveBtn")
      .append(i)
      .click(() => {
        save(time, event);
      });
    const div = $("<div />").addClass("row time-block");
    div.append(h5);
    div.append(h4);
    div.append(button);
    console.log(div);

    $(".container").append(div);
  });
}

function save(time, event) {
  const planner = JSON.parse(localStorage.getItem("planner"));

  const newPlanner = planner.map((item) => {
    if (item.time === time) {
      return {
        time,
        event,
      };
    }
    return item;
  });
  localStorage.setItem("planner", JSON.stringify(newPlanner));
}

init();
