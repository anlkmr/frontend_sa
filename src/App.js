import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Outlet } from "react-router-dom";
import Topbar from "./global/Topbar";
import SidebarComponent from "./global/Sidebar";
import { ColorModeContext, useMode } from "./theme";
import Dashboard from "./scenens/dashboard/index";
import Login from "./components/Login";
import ProtectedRoute from "./ProtectedRoute";
import ManageChannels from "./scenens/ManageChannels";
import CreateChannels from "./scenens/ManageChannels/Create";
import UpdateChannels from "./scenens/ManageChannels/Update";
import MonitorChannels from "./scenens/MonitorChannels/index";
import ViewMessages from "./scenens/ViewMessages/index";
function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="" element={<ProtectedLayout />}>
            <Route path="" element={<ProtectedRoute />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="manage-channels" element={<ManageChannels />} />
              <Route
                path="manage-channels/create"
                element={<CreateChannels />}
              />
              <Route
                path="manage-channels/update/:channelId"
                element={<UpdateChannels />}
              />
              <Route path="monitor-channels" element={<MonitorChannels />} />
              <Route path="view-messages" element={<ViewMessages />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
      </ColorModeContext.Provider>
   
  );
}

const ProtectedLayout = () => (
  <div className="app">
    <SidebarComponent />
    <main className="content">
      <Topbar />
      <Outlet />
    </main>
  </div>
);

export default App;

