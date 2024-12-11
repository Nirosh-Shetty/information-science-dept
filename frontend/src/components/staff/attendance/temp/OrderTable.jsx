/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import Divider from "@mui/joy/Divider";
import Table from "@mui/joy/Table";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import Dropdown from "@mui/joy/Dropdown";
import MenuButton from "@mui/joy/MenuButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import IconButton from "@mui/joy/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import RuleIcon from "@mui/icons-material/Rule";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import { useTheme } from "@mui/joy/styles";
import { useRecoilState } from "recoil";
import {
  studentSearchQueryState,
  studentListState,
  updatedStudentListState,
} from "../../../../../recoil/atoms/attendanceAtom";

export default function OrderTable({ theme }) {
  const [rowsData, setRowsData] = useState([]);

  const [studentList, setStudentList] = useRecoilState(studentListState);
  const [searchQuery, setSearchQuery] = useRecoilState(studentSearchQueryState);
  const [updatedlist, setUpdatedlist] = useRecoilState(updatedStudentListState);
  const [filteredList, setFilteredList] = useState([]);
  // console.log(studentList);

  useEffect(() => {
    // Transform backend data to the required format
    console.log(studentList);
    const transformedData = studentList.attendance?.map((record) => ({
      id: record._id, // Use the attendance ID
      name: record.student?.fullName || "N/A", // Extract the student's name
      usn: record.student?.usn || "N/A", // Extract the student's USN
      attendance: record.attendance, // Attendance status
    }));
    setFilteredList(transformedData);
    setUpdatedlist(transformedData);
  }, [studentList]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredList(updatedlist);
      return;
    }
    const filteredItems = updatedlist.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredList(filteredItems);
  }, [searchQuery, updatedlist]);

  // useEffect(() => {
  //   setFilteredList(updatedlist);
  // }, [updatedlist]);
  const toggleAttendance = (index) => {
    // Find the index of the toggled item in the original list
    const originalIndex = updatedlist.findIndex(
      (item) => item.usn === filteredList[index].usn
    );

    if (originalIndex !== -1) {
      const updatedRows = updatedlist.map((row, idx) =>
        idx === originalIndex
          ? {
              ...row,
              attendance: ["Present", "Absent", "Excused"][
                (["Present", "Absent", "Excused"].indexOf(row.attendance) + 1) %
                  3
              ],
            }
          : row
      );

      setUpdatedlist(updatedRows); // Update the original list

      // Re-apply the filter to reflect changes in the filtered list
      const newFilteredItems = updatedRows.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredList(newFilteredItems);
    }
  };

  //try use callback above
  return (
    <>
      <Sheet
        variant="outlined"
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "dark"
              ? "var(--joy-palette-neutral-900)"
              : "var(--joy-palette-background-surface)",
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          minHeight: 0,
        })}
      >
        <Table
          aria-labelledby="Attedance"
          stickyHeader
          hoverRow
          sx={{
            "--TableCell-headBackground":
              "var(--joy-palette-background-level1)",
            "--Table-headerUnderlineThickness": "1px",
            "--TableRow-hoverBackground":
              "var(--joy-palette-background-level1)",
            "--TableCell-paddingY": "4px",
            "--TableCell-paddingX": "8px",
            cursor: "pointer",
            // borderCollapse: "collapse",
          }}
        >
          <thead
          // style={{ position: "sticky", top: 50, zIndex: 10 }}
          >
            <tr style={{ fontSize: "1.4em" }}>
              <th
                style={{ width: 48, textAlign: "center", padding: "12px 6px" }}
              ></th>
              <th style={{ width: 180, padding: "15px 6px" }}>
                <PersonIcon
                  sx={{
                    fontSize: "1.4rem",
                    paddingBottom: "1.5px",
                    paddingRight: "5px",
                  }}
                />
                Name
              </th>
              <th style={{ width: 200, padding: "15px 6px" }}>
                <PersonPinIcon
                  sx={{
                    fontSize: "1.4rem",
                    paddingBottom: "1.5px",
                    paddingRight: "5px",
                  }}
                />
                USN
              </th>
              <th style={{ width: 170, padding: "15px 6px" }}>
                <RuleIcon
                  sx={{
                    fontSize: "1.4rem",
                    paddingBottom: "1.5px",
                    paddingRight: "5px",
                  }}
                />
                Attendance
              </th>
              {/* <th style={{ width: 140, padding: "15px 6px" }}>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((row, index) => (
                <tr
                  key={index}
                  onClick={() => toggleAttendance(index)}
                  // style={{ padding: "40" }}
                >
                  <td style={{ textAlign: "center", width: 100 }}></td>
                  <td>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        alignItems: "center",
                        padding: 2,
                        paddingLeft: 0,
                      }}
                    >
                      <Avatar size="sm">{row.name[0]}</Avatar>
                      <Typography level="body-xs">{row.name}</Typography>
                    </Box>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.usn}</Typography>
                  </td>

                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          Present: <CheckRoundedIcon />,
                          Absent: <BlockIcon />,
                          Excused: <AutorenewRoundedIcon />,
                        }[row.attendance]
                      }
                      color={
                        {
                          Present: "success",
                          Absent: "danger",
                          Excused: "neutral",
                        }[row.attendance]
                      }
                    >
                      {row.attendance}
                    </Chip>
                  </td>
                  {/* <td>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <RowMenu />
                </Box>
              </td> */}
                </tr>
              ))
            ) : (
              <tr className="flex items-center justify-center">
                <td>{/* <Box>NO student Found</Box> */}</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Sheet>
    </>
  );
}

//TODO: use recoil buddy
