import { useState } from "react";

export default function HeaderDashboard() {
  const [headerBtn, setHeaderBtn] = useState([
    { name: "MINT STREAL" },
    { name: "DEPOSIT TOKEN" },
    { name: "REDEEM COLLATERAL" },
  ]);
  return (
    <div className="w-full bg-black text-[12px] lg:text-[16px]">
      <div className="flex text-white justify-between px-[12vw] mx-auto  ">
        {headerBtn.map((item, index) => {
          return (
            <button
              key={index}
              className={`${
                index === 1
                  ? " border-spiceOrange"
                  : "text-gray-400 border-lightGray"
              } border-b-2  py-2`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
