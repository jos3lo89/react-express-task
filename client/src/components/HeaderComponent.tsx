import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

const HeaderComponent = () => {
  const logout = useAuthStore((set) => set.logout);
  const clearStore = useAuthStore((set) => set.clearStore);

  const handleClik = () => {
    logout();
    clearStore();
  };

  return (
    <header className="bg-slate-800 flex justify-around items-center  ">
      <nav className="space-x-6 text-center py-4">
        <Link
          className="capitalize font-normal text-xl hover:bg-gray-600 rounded-lg border-none p-2"
          to={"/"}
        >
          Home
        </Link>

        <Link
          className="capitalize font-normal text-xl hover:bg-gray-600 rounded-lg border-none p-2"
          to={"/new"}
        >
          New task
        </Link>
      </nav>
      <div>
        <button
          onClick={handleClik}
          className="bg-red-600 px-2 py-1 rounded-lg border-none outline-none hover:bg-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};
export default HeaderComponent;
