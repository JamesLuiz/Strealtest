import strealLogo from "../../public/newImages/globals/streal-logo.svg";
import Image from "next/image";
import { useWeb3 } from "../../redux/auth/hooks";
import { useContext, useEffect } from "react";
import { StrealContext } from "../../pages/indexData";

export default function StrealAccountDisplay() {
  const { web3Provider, _CONNECT_WALLET, _DISCONNECT_WALLET, address } =
    useWeb3();
  const strealData = useContext(StrealContext);
  const { getUserData, data, returnMintedStreal, mintedStreal } = strealData;

  useEffect(() => {
    if (data) {
      console.log("somwn", data + "dfndnf");
      returnMintedStreal(data);
      console.log("minted", mintedStreal);
    }
  }, [data, mintedStreal]);

  return (
    <div className="w-[310px] h-[150px] bg-spiceOrange rounded-[16px] relative">
      <div className="absolute text-[30px] left-[28px] bottom-[9px] font-manrope font-bold ">
        {mintedStreal} STRL
      </div>
      <div className="absolute  bg-black rounded-full w-[45px] h-[45px] top-[9px] right-[12px] flex items-center justify-center">
        <Image
          src={strealLogo}
          alt={"streal logo"}
          width={20}
          height={20}
        ></Image>
      </div>
    </div>
  );
}
