import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";

const MainLayout = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;
