import * as React from "react";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import SaveIcon from "@mui/icons-material/Save";
// import Sidebar from './components/Sidebar';
import OrderTable from "./OrderTable";
import OrderList from "./OrderList";
// import Header from './components/Header';

import Input from "@mui/joy/Input";
import SearchIcon from "@mui/icons-material/Search";

import { useMediaQuery } from "@mui/material";

export default function Temp() {
  const isXs = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          minHeight: "100dvh",
          height: "auto",
        }}
      >
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: "calc(12px + var(--Header-height))",
              sm: "calc(12px + var(--Header-height))",
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            height: "100dvh",
            gap: 1,
          }}
        >
          <Box className="flex items-center justify-start mb-2">
            <h1 className="text-4xl font-extrabold pr-5">7 ISE B </h1>
            <h3 className="text-gray-600">
              16<sup>th</sup> January '24
            </h3>
          </Box>
          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon fontSize="sm" />}
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                sx={{ fontSize: 12, fontWeight: 500 }}
              >
                Dashboard
              </Link>
              <Typography
                color="primary"
                sx={{ fontWeight: 500, fontSize: 12 }}
              >
                Orders
              </Typography>
            </Breadcrumbs>
          </Box> */}
          <Box
            sx={{
              display: "flex",
              mb: 1,
              gap: 3,
              flexDirection: { xs: "column", sm: "row" },
              alignItems: { xs: "start", sm: "center" },
              flexWrap: "wrap",
              justifyContent: "space-between",
              // height: "50px",
              // marginLeft: "20px",
              // position: "sticky",
              // top: 10,
              // zIndex: 10,
              // backgroundColor: "background.paper",
              // marginBottom: 10,
            }}
          >
            {/* <Typography level="h2" component="h1">
              Orders
            </Typography> */}
            <Input
              size="sm"
              placeholder="Search"
              startDecorator={<SearchIcon />}
              sx={{ flexGrow: 1, padding: "10px" }}
            />
            <Button
              color="primary"
              startDecorator={<DownloadRoundedIcon />}
              size="sm"
              sx={
                !isXs && {
                  padding: "10px",
                }
              }
            >
              Download Sheet
            </Button>
          </Box>
          <div> {isXs ? <OrderList /> : <OrderTable />}</div>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              marginY: "18px",
            }}
          >
            <Button variant="outlined" color="neutral">
              Cancel
            </Button>
            <Button
              color="success"
              startDecorator={<SaveIcon />}
              sx={{ paddingX: "25px" }}
            >
              Save
            </Button>
          </Box>
          <br />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
