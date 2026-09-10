import React from "react";
import { NavLink } from "react-router-dom";
import { LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";
import { MdAnalytics, MdLogout, MdNotificationAdd, MdReviews, } from "react-icons/md";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import { ImSpoonKnife } from "react-icons/im";
import { FaMoneyCheck, FaUser } from "react-icons/fa";
import { BsShop } from "react-icons/bs";


interface LeftNavProps {
  setIsExpanded: (value: boolean) => void;
}

const LeftNav: React.FC<LeftNavProps> = ({ setIsExpanded }) => {

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard/overview",
      icon: <LuLayoutDashboard />,
    },
    {
      name: "Orders",
      path: "/dashboard/order",
      icon: <BsFileEarmarkMedicalFill />,
    },
    {
      name: "Menu",
      path: "/dashboard/menu",
      icon: <ImSpoonKnife />,
    },
    {
      name: "Mini-mart",
      path: "/dashboard/minimart",
      icon: <BsShop />,
    },
    {
      name: "Customers",
      path: "/dashboard/customers",
      icon: <FaUser />,
    },
    {
      name: "Payment",
      path: "/dashboard/payment",
      icon: <FaMoneyCheck />,
    },
    {
      name: "Review",
      path: "/dashboard/review",
      icon: <MdReviews />,
    },
    {
      name: "Notification",
      path: "/dashboard/notification",
      icon: <MdNotificationAdd  />,
    },
    {
      name: "Analysis",
      path: "/dashboard/analysis",
      icon: <MdAnalytics  />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <LuSettings  />,
    },
 
  ];

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full flex flex-col bg-primary "
    >
      <div className="p-2 border-b border-white/20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-8 rounded-xl flex items-center justify-center ms-5">
            <img src={assets.image} alt="" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">RAMAT PICKUP</h1>
            {/* <p className="text-white/60 text-xs capitalize">{user?.role} Portal</p> */}
          </div>
        </motion.div>
      </div>

      <nav className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-1 mt-3">
        {navLinks.map((navlink, index) => (
          <motion.div
            key={navlink.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <NavLink
              to={navlink.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-white transition-all duration-200 ${
                  isActive
                    ? "bg-white/20 font-semibold"
                    : "hover:bg-white/10"
                }
              `}
              onClick={() => setIsExpanded(false)}
            >
              <span className="text-lg">{navlink.icon}</span>
              <span className="text-sm">{navlink.name}</span>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/20">
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          type="button"
        //   onClick={logout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
        >
          <MdLogout className="text-lg" />
          <span className="text-sm">Logout</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LeftNav;
