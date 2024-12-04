import React from "react";
import Image from "next/image";
const Header = ({ name }) => {
  return (
    <div className=" h-15 w-full bg-slate-600">
      <div className="flex p-2 space-x-2 items-center">
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/2048px-Windows_10_Default_Profile_Picture.svg.png"
        width={35}
        height={35}
        alt=""
      />
      <div className="">Trip Plannings</div></div>

    </div>
  );
};

export default Header;
