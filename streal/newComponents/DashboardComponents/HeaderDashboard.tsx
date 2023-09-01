import { useState } from "react";

export default function HeaderDashboard() {
  const [headerBtn, setHeaderBtn] = useState([
    { name: "MINT STREAL" },
    { name: "DEPOSIT TOKEN" },
    { name: "REDEEM COLLATERAL" },
  ]);
  return (
    <div className="w-full bg-black">
      <div className="flex text-white justify-between px-[12vw] mx-auto  ">
        {headerBtn.map((item, index) => {
          return (
            <button className={`${index === 1 ? " " : "text-gray-400"} `}>
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
