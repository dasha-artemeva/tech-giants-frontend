import Header from "./components/Header";
import {Divider, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";


function AppLayout() {
  return (
      <>
          <Header/>
          <Toolbar/>
          <Divider sx={{bgcolor: 'secondary.main', mb: 1}}/>
          <Outlet/>
      </>
  )
}

export default AppLayout
