import dashboardArrow from "../../public/newImages/dashboard/dashboard-arrow.svg";
import Image from "next/image";
import StrealAccountDisplay from "./StrealAccountDisplay";
import CollateralAccountDisplay from "./CollateralAccountDisplay";
import { useWeb3 } from "../../redux/auth/hooks";
export default function UserDashboardNew() {
  const { web3Provider, _CONNECT_WALLET, _DISCONNECT_WALLET, address } =
    useWeb3();
  return (
    <div className="h-[380px] bg-[#1B1B1B] w-full relative font-manropeLight flex items-center justify-center">
      <Image
        alt="arrow"
        src={dashboardArrow.src}
        width={365}
        height={400}
        className={"absolute bottom-0 left-0 "}
      ></Image>
      <div className="absolute text-[50px] z-10 text-white font-thin top-[42px] left-[47px] leading-none">
        User's
        <div>Dashboard</div>
      </div>
      <div className="absolute right-[50px] ">
        {" "}
        <CollateralAccountDisplay></CollateralAccountDisplay>
      </div>
      <div className="absolute right-[430px] ">
        {" "}
        <StrealAccountDisplay></StrealAccountDisplay>
      </div>
    </div>
  );
}
