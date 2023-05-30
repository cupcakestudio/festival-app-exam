import stylesSchedule from "../styles/Schedule.module.css";
import { useState } from "react";
import Link from "next/link";

// MUI

import * as React from "react";
import { Paper, Table } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const columns = [
  {
    id: "time00",
    label: "00:00 - 02:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time02",
    label: "02:00 - 04:00",
    minWidth: 170,
    align: "right",
  },

  {
    id: "time04",
    label: "04:00 - 06:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time06",
    label: "06:00 - 08:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time08",
    label: "08:00 - 10:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time10",
    label: "10:00 - 12:0",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time12",
    label: "12:00 - 14:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time14",
    label: "14:00 - 16:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time16",
    label: "16:00 - 18:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time18",
    label: "18:00 - 20:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time20",
    label: "20:00 - 22:00",
    minWidth: 170,
    align: "right",
  },
  {
    id: "time22",
    label: "22:00 - 00:00",
    minWidth: 170,
    align: "right",
  },
];

function createData(
  time00,
  time02,
  time04,
  time06,
  time08,
  time10,
  time12,
  time14,
  time16,
  time18,
  time20,
  time22
) {
  return {
    time00,
    time02,
    time04,
    time06,
    time08,
    time10,
    time12,
    time14,
    time16,
    time18,
    time20,
    time22,
  };
}

export default function StickyHeadTable({ schedule }) {
  const rows = {
    Monday: [
      createData(...test("mon", "Midgard")),
      createData(...test("mon", "Vanaheim")),
      createData(...test("mon", "Jotunheim")),
    ],
    Tuesday: [
      createData(...test("tue", "Midgard")),
      createData(...test("tue", "Vanaheim")),
      createData(...test("tue", "Jotunheim")),
    ],
    Wednesday: [
      createData(...test("wed", "Midgard")),
      createData(...test("wed", "Vanaheim")),
      createData(...test("wed", "Jotunheim")),
    ],
    Thursday: [
      createData(...test("thu", "Midgard")),
      createData(...test("thu", "Vanaheim")),
      createData(...test("thu", "Jotunheim")),
    ],
    Friday: [
      createData(...test("fri", "Midgard")),
      createData(...test("fri", "Vanaheim")),
      createData(...test("fri", "Jotunheim")),
    ],
    Saturday: [
      createData(...test("sat", "Midgard")),
      createData(...test("sat", "Vanaheim")),
      createData(...test("sat", "Jotunheim")),
    ],
    Sunday: [
      createData(...test("sun", "Midgard")),
      createData(...test("sun", "Vanaheim")),
      createData(...test("sun", "Jotunheim")),
    ],
  };

  // export default function StickyHeadTable({ schedule }) {
  //   const rows = [createData(...test("mon", "Midgard")), createData(...test("mon", "Vanaheim")), createData(...test("mon", "Jotunheim"))];
  //   const rows2 = [createData(...test("tue", "Midgard")), createData(...test("tue", "Vanaheim")), createData(...test("tue", "Jotunheim"))];
  //   const [day, setDay] = useState("Monday");
  //   //filter for button days
  //   function changeDay(event) {
  //     if (event.target.value === "Monday") {
  //       setDay("Monday");
  //       console.log(day);
  //     }
  //     if (event.target.value === "Tuesday") {
  //       setDay("Tuesday");
  //       console.log(day);
  //     }
  //     if (event.target.value === "Wednesday") {
  //       setDay("Wednesday");
  //       console.log(day);
  //     }
  //     if (event.target.value === "Thursday") {
  //       setDay("Thursday");
  //       console.log(day);
  //     }
  //     if (event.target.value === "Friday") {
  //       setDay("Friday");
  //       console.log(day);
  //     }
  //     if (event.target.value === "Saturday") {
  //       setDay("Saturday");
  //       console.log(day);
  //     }
  //     if (event.target.value === "Sunday") {
  //       setDay("Sunday");
  //       console.log(day);
  //     }
  //   }

  const [day, setDay] = useState("Monday");
  const [displayedDay, setDisplayedDay] = useState("Monday");

  // Function to update the displayed day and rows based on the selected day
  function updateDisplayedDay(selectedDay) {
    setDisplayedDay(selectedDay);
  }

  // Filter for button days
  function changeDay(event) {
    const selectedDay = event.target.value;
    setDay(selectedDay);
    console.log(day);
    updateDisplayedDay(selectedDay);
  }

  // Retrieve the rows for the displayed day
  // || is used to provide a fallback value, which is an empty array [].
  // This ensures that displayedRows will always be an array, even if the displayedDay is not found in the rows object.
  const displayedRows = rows[displayedDay] || [];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function test(day, stage) {
    // Object to store the results
    const results = [];
    //for (const day in schedule.Midgard) {

    const activities = schedule[stage][day];
    for (const activity of activities) {
      if (activity.act !== "break") {
        results.push(activity.act);
      } else {
        // Push an empty string as a placeholder for the empty spot
        results.push("");
      }
    }

    //}
    console.log({ results });
    return results;
  }
  return (
    <>
      <h1 className={stylesSchedule.scheduleHeading}>Schedule</h1>
      <Link className={stylesSchedule.link} href="/program">
        / Program
      </Link>
      {/* schedule timetable */}
      {/* BUTTONS TO CHOOSE DAYS */}
      <div className={stylesSchedule.days}>
        <button onClick={changeDay} value="Monday">
          Monday
        </button>
        <button onClick={changeDay} value="Tuesday">
          Tuesday
        </button>
        <button onClick={changeDay} value="Wednesday">
          Wednesday
        </button>
        <button onClick={changeDay} value="Thursday">
          Thursday
        </button>
        <button onClick={changeDay} value="Friday">
          Friday
        </button>
        <button onClick={changeDay} value="Saturday">
          Saturday
        </button>
        <button onClick={changeDay} value="Sunday">
          Sunday
        </button>
      </div>
      <h2 className={stylesSchedule.dayName}>{day}</h2>
      <section className={stylesSchedule.scheduleSection}>
        <div className={stylesSchedule.schedule_sceneNavne}>
          <p>Midgard</p> <br />
          <p>Vanaheim</p> <br />
          <p>Jotunheim</p>
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* changed the MUI "structure" from rows to displayedRows */}
                {displayedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  // const api = "http://localhost:8080/schedule";
  const api = "https://nova-enchanted-confidence.glitch.me/schedule";

  const res = await fetch(api);
  const data = await res.json();
  console.log(data);
  return {
    props: { schedule: data },
  };
}
