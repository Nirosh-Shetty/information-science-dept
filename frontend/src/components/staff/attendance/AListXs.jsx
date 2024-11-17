/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import Box from "@mui/joy/Box";
import Avatar from "@mui/joy/Avatar";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Divider from "@mui/joy/Divider";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemContent from "@mui/joy/ListItemContent";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import ListDivider from "@mui/joy/ListDivider";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Dropdown from "@mui/joy/Dropdown";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BlockIcon from "@mui/icons-material/Block";
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AccessTimeFilledOutlinedIcon from "@mui/icons-material/AccessTimeFilledOutlined";
import Groups2Icon from "@mui/icons-material/Groups2";
import SubjectIcon from "@mui/icons-material/Subject";
import DangerousRoundedIcon from "@mui/icons-material/DangerousRounded";
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

const attendanceData = [
  {
    className: "3 ISE A",
    subject: "Operating System",
    time: "10:30 AM Feb 2 '24",
    attendance: { attended: 67, total: 90 },
  },
  {
    className: "2 ISE B",
    subject: "Data Structures",
    time: "11:00 AM Feb 2 '24",
    attendance: { attended: 72, total: 90 },
  },

  {
    className: "7 CSE B",
    subject: "Computer Networks",
    time: "10:15 AM Feb 1 '24",
    attendance: { attended: 65, total: 90 },
  },
  {
    className: "3 ISE A",
    subject: "Operating System",
    time: "10:30 AM Feb 2 '24",
    attendance: { attended: 67, total: 90 },
  },
  {
    className: "3 ISE A",
    subject: "Operating System",
    time: "10:30 AM Feb 2 '24",
    attendance: { attended: 67, total: 90 },
  },
  {
    className: "8 ISE A",
    subject: "Machine Learning",
    time: "11:30 AM Feb 3 '24",
    attendance: { attended: 30, total: 80 },
  },
  {
    className: "8 ISE B",
    subject: "Artificial Intelligence",
    time: "12:15 PM Feb 3 '24",
    attendance: { attended: 28, total: 80 },
  },
  {
    className: "3 ISE A",
    subject: "Operating System",
    time: "10:30 AM Feb 2 '24",
    attendance: { attended: 67, total: 90 },
  },
  {
    className: "5 CSE A",
    subject: "Cyber Security",
    time: "2:00 PM Feb 4 '24",
    attendance: { attended: 74, total: 85 },
  },
  {
    className: "6 CSE B",
    subject: "Cloud Computing",
    time: "2:45 PM Feb 4 '24",
    attendance: { attended: 77, total: 85 },
  },
  {
    className: "3 ISE A",
    subject: "Operating System",
    time: "10:30 AM Feb 2 '24",
    attendance: { attended: 67, total: 90 },
  },
];

function RowMenu() {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: "plain", color: "neutral", size: "sm" } }}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem>Edit</MenuItem>
        <Divider />
        <MenuItem color="danger">Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}
export default function AListXs() {
  return (
    <Box>
      {attendanceData.map((row, index) => {
        const percentage = (
          (row.attendance.attended / row.attendance.total) *
          100
        ).toFixed(2);
        const attendenaceTheme =
          percentage > 80 ? "A" : percentage > 70 ? "B" : "C";
        const classYear = Math.ceil(parseInt(row.className[0]) / 2);
        return (
          <List
            key={index}
            size="sm"
            sx={{ "--ListItem-paddingX": 0, cursor: "pointer" }}
          >
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
              }}
            >
              <ListItemContent
                sx={{ display: "flex", gap: 2, alignItems: "start" }}
              >
                <ListItemDecorator>
                  <Avatar size="sm">{row.className[0]}</Avatar>
                </ListItemDecorator>
                <div>
                  <Typography gutterBottom sx={{ fontWeight: 600 }}>
                    {row.className}
                  </Typography>
                  <Typography level="body-xs" gutterBottom>
                    {row.subject}
                  </Typography>
                  <Typography level="body-xs" gutterBottom>
                    {row.time}
                  </Typography>
                </div>
              </ListItemContent>
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  paddingRight: "20px",
                }}
              >
                <Chip
                  variant="soft"
                  size="sm"
                  sx={{
                    padding: "5px 8px",
                  }}
                  startDecorator={
                    {
                      A: (
                        <ThumbUpAltRoundedIcon
                          sx={{ opacity: 0.5, paddingX: "2px" }}
                        />
                      ),
                      B: (
                        <WarningAmberRoundedIcon
                          sx={{ opacity: 0.5, paddingX: "1px" }}
                        />
                      ),
                      C: (
                        <DangerousRoundedIcon
                          sx={{ opacity: 0.5, paddingX: "1px" }}
                        />
                      ),
                    }[attendenaceTheme]
                  }
                  color={
                    {
                      A: "success",
                      B: "warning",
                      C: "danger",
                    }[attendenaceTheme]
                  }
                >
                  {row.attendance.attended}/{row.attendance.total}
                  &nbsp;&nbsp;
                  <span className=" font-thin text-opacity-20 text-xs">|</span>
                  &nbsp;&nbsp;
                  {percentage}%
                </Chip>
              </Box>
              <RowMenu />
            </ListItem>
            <ListDivider />
          </List>
        );
      })}
      <Box
        className="Pagination-mobile"
        sx={{
          display: { xs: "flex", md: "none" },
          alignItems: "center",
          py: 2,
        }}
      >
        <IconButton
          aria-label="previous page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Typography level="body-sm" sx={{ mx: "auto" }}>
          Page 1 of 10
        </Typography>
        <IconButton
          aria-label="next page"
          variant="outlined"
          color="neutral"
          size="sm"
        >
          <KeyboardArrowRightIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
