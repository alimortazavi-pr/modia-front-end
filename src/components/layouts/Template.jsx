import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//Import Components
import Tab from "components/layouts/Tab";
import Nav from "components/layouts/Nav";
import Drawer from "components/layouts/Drawer";
import Aside from "components/layouts/Aside";
import News from "components/layouts/News";

export default function Template({ children }) {
  //Redux
  const { login } = useSelector((state) => state.auth);

  //Other Hooks
  const navigate = useNavigate();

  //States
  const [showDrawer, setShowDrawer] = useState(false);

  //Effects
  useEffect(() => {
    if (login !== null && !login) {
      return navigate("/login");
    }
  }, [login, navigate]);

  return (
    <>
      <main className="h-screen flex justify-center flex-col relative md:flex-row">
        <Drawer showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
        <Aside />
        <div className="flex-1 flex flex-col overflow-y-hidden md:flex-none md:w-600 md:border-r-1/2 md:border-gray-600 relative">
          <div className="overflow-y-auto">
            <Nav setShowDrawer={setShowDrawer} />
            {children}
          </div>
        </div>
        <Tab />
        <News />
      </main>
    </>
  );
}
