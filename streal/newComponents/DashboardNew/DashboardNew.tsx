import UserDashboardNew from "./UserDashboardNew";
import StrealAccountDisplay from "./StrealAccountDisplay";
import Image from "next/image";
import dashboardArrow from "../../public/newImages/dashboard/dashboard-arrow.svg";
import HeaderDashboard from "../DashboardComponents/HeaderDashboard";
import { useState } from "react";

export default function DashboardNew() {
  const collateralBtns = [{ name: "USDC" }, { name: "DAI" }, { name: "USDT" }];

  const [selectedHeader, setSelectedHeader] = useState("MINT STREAL");
  return (
    <div className="w-full h-screen bg-[#F6F6F6]">
      <UserDashboardNew></UserDashboardNew>
      <div className="  ">
        {" "}
        <HeaderDashboard></HeaderDashboard>
      </div>
      <div>
        <div className=" w-full px-[12vw] mx-auto mt-[40px]">
          <div className="flex gap-x-[24px]">
            {collateralBtns.map((item, index) => {
              return (
                <button
                  key={index}
                  className="flex w-[90px] text-[0.8rem] border-b-[3px] border-black justify-center"
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <div className="text-[0.8rem] text-lightGray mt-[9px]">
            Please Select your Preferred Collateral Currency.
          </div>
        </div>
      </div>
    </div>
  );
}
