import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import { Toaster } from 'sonner';

const MainLayout = () => {
  return (
    <>
      <HeaderComponent />
      <main>
        <Outlet />
        <Toaster />
      </main>
    </>
  );
};
export default MainLayout;
