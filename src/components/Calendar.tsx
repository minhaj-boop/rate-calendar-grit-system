import React, { useEffect, useState } from "react";
import axios from "axios";
import { AppBar, Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./Calendar.css";

//types
interface IRoomInventoryCalendar {
  status: boolean;
  available: number;
  booked: number;
}

interface IRateCalendar {
  rate: number;
  min_length_of_stay: number;
  reservation_deadline: number;
}

interface IRatePlan {
  name: string;
  rateCalendar: IRateCalendar[];
}

interface IRoomCategory {
  name: string;
  occupancy: number;
  inventory: IRoomInventoryCalendar[];
  ratePlans: IRatePlan[];
}

interface ApiResponse {
  data: IRoomCategory[];
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const Calendar = () => {
  //comment
  const [data, setData] = useState<IRoomCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  //comment
  const [startValue, setStartValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17")
  );
  const [endValue, setEndValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17")
  );

  //comment
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${dayjs(
            startValue
          ).format("YYYY-MM-DD")}&end_date=${dayjs(endValue).format(
            "YYYY-MM-DD"
          )}`
        );
        if (response.data && Array.isArray(response.data.data)) {
          setData(response.data.data);
        }
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [startValue, endValue]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) {
    console.log(data);
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          height: "auto",
          minHeight: 160,
          display: "flex",
          alignItems: "flex-start",
          px: 4,
          backgroundColor: "white",
          boxShadow: "none",
          color: "black",
          borderRadius: 2,
        }}
      >
        <h2>Rate Calendar</h2>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Box
            sx={{
              width: "auto",
              minWidth: 450,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <DateField
              className="startDate"
              value={startValue}
              onChange={(newValue) => setStartValue(newValue)}
            />
            <DateField
              value={endValue}
              onChange={(newValue) => setEndValue(newValue)}
            />
          </Box>
        </LocalizationProvider>
      </AppBar>

      <Box sx={{ mt: 30 }}>
        <TableContainer component={Paper} sx={{ display: "flex" }}>
          {/* <Table
            sx={{ width: 400, overflowX: "clip" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: 1,
                    borderColor: "grey.200",
                    height: 15,
                    maxHeight: 15,
                  }}
                >
                  Dessert (100g serving)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cols.map((col) => (
                <TableRow
                  key={col.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      borderRight: 1,
                      borderColor: "grey.200",
                      height: 15,
                      maxHeight: 15,
                    }}
                    component="th"
                    scope="row"
                  >
                    {col.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
          <Table
            sx={{ minWidth: 650, overflowX: "scroll" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: 1,
                    borderColor: "grey.200",
                    height: 15,
                    maxHeight: 15,
                  }}
                >
                  Dessert (100g serving)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    borderRight: 1,
                    borderColor: "grey.200",
                    height: 15,
                    maxHeight: 15,
                  }}
                >
                  Dessert (100g serving)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                      height: 15,
                      maxHeight: 15,
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      borderRight: 1,
                      borderColor: "grey.200",
                      height: 15,
                      maxHeight: 15,
                    }}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: 1,
                      borderColor: "grey.200",
                      height: 15,
                      maxHeight: 15,
                    }}
                    align="right"
                  >
                    {row.calories}
                  </TableCell>
                  <TableCell
                    sx={{
                      borderRight: 1,
                      borderColor: "grey.200",
                      height: 15,
                      maxHeight: 15,
                    }}
                    align="right"
                  >
                    {row.fat}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Calendar;
