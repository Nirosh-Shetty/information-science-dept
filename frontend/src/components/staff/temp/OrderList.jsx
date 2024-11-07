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

const initialListItems = [
  {
    id: "INV-1234",
    // date: "Feb 3, 2023",
    attendance: "Excused",
    name: "Olivia Ryhe",
    usn: "1at21is073",
  },
  {
    id: "INV-1233",
    // date: "Feb 3, 2023",
    attendance: "Present",
    name: "Steve Hampton",
    usn: "1at21is073",
  },
  {
    id: "INV-1232",
    // date: "Feb 3, 2023",
    attendance: "Excused",
    name: "Ciaran Murray",
    usn: "1at21is073",
  },
  {
    id: "INV-1231",
    // date: "Feb 3, 2023",
    attendance: "Excused",
    name: "Maria Macdonald",
    usn: "1at21is073",
  },
  {
    id: "INV-1230",
    // date: "Feb 3, 2023",
    attendance: "Absent",
    name: "Charles Fulton",
    usn: "1at21is073",
  },
  {
    id: "INV-1229",
    // date: "Feb 3, 2023",
    attendance: "Absent",
    name: "Jay Hooper",
    usn: "1at21is073",
  },
];

export default function OrderList() {
  const [listItems, setListItems] = React.useState(initialListItems);

  const toggleAttendance = (index) => {
    // console.log("hi");
    const statuses = ["Present", "Absent", "Excused"];
    const updatedListItems = [...listItems];
    const currentIndex = statuses.indexOf(updatedListItems[index].attendance);
    updatedListItems[index].attendance =
      statuses[(currentIndex + 1) % statuses.length];
    setListItems(updatedListItems);
  };

  return (
    <Box>
      {listItems.map((listItem, index) => (
        <List
          key={listItem.id}
          size="sm"
          sx={{ "--ListItem-paddingX": 0, cursor: "pointer" }}
        >
          <ListItem
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
            }}
            onClick={() => toggleAttendance(index)} // Toggle on click
          >
            <ListItemContent
              sx={{ display: "flex", gap: 2, alignItems: "start" }}
            >
              <ListItemDecorator>
                <Avatar size="sm">{listItem.name[0]}</Avatar>
              </ListItemDecorator>
              <div>
                <Typography gutterBottom sx={{ fontWeight: 600 }}>
                  {listItem.name}
                </Typography>
                <Typography level="body-xs" gutterBottom>
                  {listItem.usn}
                </Typography>
              </div>
            </ListItemContent>
            <Chip
              variant="soft"
              size="sm"
              startDecorator={
                {
                  Present: <CheckRoundedIcon />,
                  Excused: <AutorenewRoundedIcon />,
                  Absent: <BlockIcon />,
                }[listItem.attendance]
              }
              color={
                {
                  Present: "success",
                  Excused: "neutral",
                  Absent: "danger",
                }[listItem.attendance]
              }
            >
              {listItem.attendance}
            </Chip>
          </ListItem>
          <ListDivider />
        </List>
      ))}
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
