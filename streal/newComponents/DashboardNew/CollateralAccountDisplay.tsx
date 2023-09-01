import { useContext, useEffect, useState } from "react";
import { StrealContext } from "../../pages/indexData";

export default function CollateralAccountDisplay() {
  const [collateralDisplayed, setCollateralDisplayed] = useState("USDC");
  const collateralBtns = [{ name: "USDC" }, { name: "DAI" }, { name: "USDT" }];

  const strealData = useContext(StrealContext);
  const {
    getUserData,
    data,
    returnMintedStreal,
    mintedStreal,
    USDC,
    USDT,
    DAI,
    connectWallet,
  } = strealData;
  console.log("some", USDC, USDT, DAI);
  return (
    <div className="w-[310px] h-[150px] rounded-[16px] bg-dirtBrown relative">
      <div className="absolute flex gap-x-[4px] top-[9px] right-[12px]">
        {collateralBtns.map((item) => {
          return (
            <button
              key={item.name}
              onClick={() => {
                setCollateralDisplayed(item.name);
              }}
              className={` py-[5px] w-[80px] duration-300 text-spiceOrange ${
                item.name === collateralDisplayed ? "bg-black" : "bg-[#353434]"
              } rounded-full text-[12px] font-black`}
            >
              {item.name}
            </button>
          );
        })}
      </div>
      {data ? (
        <div className="absolute text-[30px] left-[28px] bottom-[9px]  text-white font-manrope">
          {[
            { val: USDC, name: "USDC" },
            { val: DAI, name: "DAI" },
            { val: USDT, name: "USDT" },
          ].map((item) => {
            if (item.name === collateralDisplayed) {
              return <div>${item.val}</div>;
            }
          })}
        </div>
      ) : (
        <div className="absolute  left-[28px] bottom-[9px]  text-white">
          Please connect your wallet.
        </div>
      )}
    </div>
  );
}
