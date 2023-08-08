import Link from "next/link";
import React from "react";
import NavLinks from "../NavLinks/NavLinks";
import Image from "next/image";
import NavInfoLinkContainer from "../NavInfoLinkContainer/NavInfoLinkContainer";
import GlobalSettings from "../GlobalSettings/GlobalSettings";
import DOTS from "../../../public/Images/dots.svg";

interface Props {
  toggleMoreModal: () => void;
  moreModal: boolean;
  webSettingsModal: boolean;
  setWebSettingsModal: any;
}

const PrimaryNav = ({
  moreModal,
  toggleMoreModal,
  webSettingsModal,
  setWebSettingsModal,
}: Props) => {
  return (
    <div className="primary--nav">
      <h4>
        <Link href="/">Streal</Link>
      </h4>

      <div className="inner--list">
        <NavLinks />
        <div onClick={toggleMoreModal} className="more">
          <p>More</p> <Image src={DOTS} alt="dots" />
        </div>

        <NavInfoLinkContainer position="web" modal={moreModal} />

        <GlobalSettings
          position="web"
          modal={webSettingsModal}
          setWebSettingsModal={setWebSettingsModal}
        />
      </div>
    </div>
  );
};

export default PrimaryNav;
