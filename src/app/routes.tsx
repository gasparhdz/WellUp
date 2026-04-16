import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Register from "./components/Register";
import EmailVerification from "./components/EmailVerification";
import NotificationSetup from "./components/NotificationSetup";
import MainApp from "./components/MainApp";
import Today from "./components/Today";
import Explore from "./components/Explore";
import ToolsScreen from "./components/ToolsScreen";
import Profile from "./components/Profile";
import LeaderDashboard from "./components/LeaderDashboard";
import NotFound from "./components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Welcome },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "verify-email", Component: EmailVerification },
      { path: "setup-notification", Component: NotificationSetup },
      {
        path: "app",
        Component: MainApp,
        children: [
          { index: true, Component: Today },
          { path: "explore", Component: Explore },
          { path: "herramientas", Component: ToolsScreen },
          { path: "yo", Component: Profile },
        ],
      },
      { path: "leader", Component: LeaderDashboard },
      { path: "*", Component: NotFound },
    ],
  },
]);
