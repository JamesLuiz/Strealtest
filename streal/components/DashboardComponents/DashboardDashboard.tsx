import { useState } from "react";
import DashboardMarketModal from "./DashboardMarketModal";
import EthereumIcon from "../../public/Images/ethereum.svg";
import DownArrow from "../../public/Images/DownArrow";
import WalletIcon from "../../public/Images/walletIcon.svg";
import NetWorkIcon from "../../public/Images/networkIcon.svg";

interface DashboardDashboardProps {
  darkMode?: boolean;
}

export default function DashboardDashboard(props: DashboardDashboardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState({
    name: "Ethereum",
    icon: EthereumIcon.src,
  });
  const handleSelectedMarket = (name: string, icon: string) => {
    setSelectedMarket((prev) => {
      return { icon: icon, name: name };
    });
  };

  const handleModal = () => {
    setIsModalOpen((prev) => {
      return !prev;
    });
  };

  const apis = [
    { icon: WalletIcon, name: "Net Worth" },
    { icon: NetWorkIcon, name: "Net APY" },
  ];

  return (
    <div className="dashboard-dashboard">
      <div className="mobile-title">Dashboard</div>
      <div className="dashboard-heading">
        <div className="dashboard-info">
          <img src={selectedMarket.icon}></img>{" "}
          <div className="dashboard-info-mrkt">
            <span>{selectedMarket.name}</span>{" "}
            <span className="mrkt-title">Market</span>
          </div>
        </div>
        <button
          onClick={() => {
            handleModal();
          }}
          className="options-btn"
        >
          {DownArrow("")}
        </button>
        <DashboardMarketModal
          closeModal={handleModal}
          isOpen={isModalOpen}
          selectedMarketName={selectedMarket.name}
          handleSelectedMarket={handleSelectedMarket}
        ></DashboardMarketModal>
      </div>
      <div className="dashboard-apis">
        {apis.map((item, index) => {
          return (
            <div className="api-items" key={index}>
              <img src={item.icon.src}></img>
              <div className="api-info-cont">
                <span>{item.name}</span>
                <div className="api-info"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
