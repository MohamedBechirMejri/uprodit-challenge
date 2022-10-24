import React from "react";

const NavButtons = ({
  startIndex,
  handleNavigation,
}: {
  startIndex: number;
  handleNavigation: any;
}) => {
  return (
    <div className="flex gap-4 py-8">
      <button
        className={`transition-all p-2 px-4 font-semibold text-white bg-slate-500 rounded ${
          !startIndex && "bg-gray-300 text-gray-600 cursor-not-allowed"
        }`}
        onClick={() => startIndex && handleNavigation("previous")}
      >
        Previous
      </button>
      <button
        className="p-2 px-4 font-semibold text-white transition-all rounded bg-slate-500"
        onClick={() => handleNavigation("next")}
      >
        Next
      </button>
    </div>
  );
};

export default NavButtons;
