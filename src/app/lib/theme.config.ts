"use client";
import { Montserrat } from "next/font/google";
import { createTheme } from "@mui/material";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const theme = createTheme({
  palette: {
    primary: {
      main: "#0c2e45",
      contrastText: "#fff",
    },
    secondary: {
      main: "#29aae3",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: montserrat.style.fontFamily,
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: "#f5f5f5",
        },
        notchedOutline: {
          borderColor: "#e3e3e3",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          textTransform: "inherit",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          paddingBlock: 8.5,
        },
      },
    },
  },
});

export default theme;
