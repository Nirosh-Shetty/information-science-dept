/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
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

const listItem = [
  {
    id: "S-101",
    usn: "1IS20IS001",
    name: "Olivia Ryhe",
    attendance: "Present",
  },
  {
    id: "S-102",
    usn: "1IS20IS002",
    name: "Steve Hampton",
    attendance: "Absent",
  },
  {
    id: "S-103",
    usn: "1IS20IS003",
    name: "Ciaran Murray",
    attendance: "Excused",
  },
  {
    id: "S-104",
    usn: "1IS20IS004",
    name: "Maria Macdonald",
    attendance: "Present",
  },
  {
    id: "S-105",
    usn: "1IS20IS005",
    name: "Charles Fulton",
    attendance: "Absent",
  },
  {
    id: "S-102",
    usn: "1IS20IS002",
    name: "Steve Hampton",
    attendance: "Absent",
  },
  {
    id: "S-103",
    usn: "1IS20IS003",
    name: "Ciaran Murray",
    attendance: "Excused",
  },
  {
    id: "S-104",
    usn: "1IS20IS004",
    name: "Maria Macdonald",
    attendance: "Present",
  },
  {
    id: "S-105",
    usn: "1IS20IS005",
    name: "Charles Fulton",
    attendance: "Absent",
  },
  {
    id: "S-102",
    usn: "1IS20IS002",
    name: "Steve Hampton",
    attendance: "Absent",
  },
  {
    id: "S-103",
    usn: "1IS20IS003",
    name: "Ciaran Murray",
    attendance: "Excused",
  },
  {
    id: "S-104",
    usn: "1IS20IS004",
    name: "Maria Macdonald",
    attendance: "Present",
  },
  {
    id: "S-105",
    usn: "1IS20IS005",
    name: "Charles Fulton",
    attendance: "Absent",
  },
];

export default function OrderTable() {
  const [rowsData, setRowsData] = useState(listItem);

  const toggleAttendance = (index) => {
    const updatedRows = [...rowsData];
    const statuses = ["Present", "Absent", "Excused"];
    const currentIndex = statuses.indexOf(updatedRows[index].attendance);
    updatedRows[index].attendance =
      statuses[(currentIndex + 1) % statuses.length];
    setRowsData(updatedRows);
  };

  return (
    <>
      <Sheet
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          // overflow: "auto",
          // height: "100%",
          minHeight: 0,
          // paddingBottom: "10px",
          // display: {
          //   xs: "none",
          //   s: "block",
          //   md: "block",
          //   lg: "block",
          //   xl: "block",
          // },
          // margin: " 5 auto",
        }}
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
            {rowsData.map((row, index) => (
              <tr
                key={row.id}
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
            ))}
          </tbody>
        </Table>
      </Sheet>
      {/* <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          borderRadius: "50%",
          display: {
            xs: "none",
            md: "flex",
          },
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {["1", "2", "3", "…", "8", "9", "10"].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? "outlined" : "plain"}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button>
      </Box> */}
    </>
  );
}
