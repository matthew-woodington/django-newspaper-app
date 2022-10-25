import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

function Layout({ superState, setSuperState, logoutUser }) {
  return (
    <>
      <Header superState={superState} setSuperState={setSuperState} logoutUser={logoutUser} />
      <Outlet />
    </>
  );
}

export default Layout;
