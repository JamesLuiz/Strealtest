import { BsArrowUpRightSquareFill } from "react-icons/bs";

export default function MintStreal() {
  return (
    <div className="w-full flex flex-col gap-y-[51px]">
      <div className="flex justify-between w-full  text-[16px] lg:text-[48px] border-b border-black pb-[10px] ">
        <div className="w-[350px] leading-none">AMOUNT TO MINT</div>
        <input
          className="bg-[#F0F0F0] border-l border-black outline-none w-[20%] placeholder:text-sm pl-[10px] placeholder:font-italic flex items-center justify-center"
          type={"number"}
          placeholder="please enter your value."
        ></input>
      </div>
      <div className="flex justify-between w-full text-[16px] lg:text-[48px] border-b border-black pb-[10px] ">
        <div className="w-[350px] leading-none">EQUIVALENT IN STREAL</div>
        <input
          className="bg-[#F0F0F0] border-l border-black outline-none w-[20%] placeholder:text-sm pl-[10px] placeholder:font-italic flex items-center justify-center"
          type={"number"}
          placeholder="please enter your value."
        ></input>
      </div>
      <button className="group bg-black text-white w-fit flex items-center gap-x-[10px] p-2 px-6 rounded-[10px] text-[14px]">
        MINT STREAL
        <BsArrowUpRightSquareFill
          color="white"
          className="fill-white group-hover:fill-spiceOrange duration-300"
          size={18}
        ></BsArrowUpRightSquareFill>
      </button>
    </div>
  );
}
