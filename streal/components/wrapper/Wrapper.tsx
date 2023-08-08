import NavBar from "../NavbarComponents/NavBar/NavBar";

interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper(props: WrapperProps) {
  return (
    <div className="wrapper">
      <NavBar />
      {props.children}
    </div>
  );
}
