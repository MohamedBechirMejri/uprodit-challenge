import React from "react";

const User = ({ user, i }: { user: any; i: number }) => {
  return (
    <div
      className="w-64 bg-white rounded-lg opacity-0 cursor-pointer animate-reveal"
      style={{
        animationDelay: 0.05 * (i + 1) + "s",
      }}
    >
      <div
        id={user.image_id}
        className="w-64 h-64 bg-center bg-no-repeat bg-cover rounded-lg"
        style={{
          backgroundImage: "url('/freelance.svg')",
        }}
      />

      <div className="flex flex-col p-4 text-[#919ca7]">
        <p className="w-full font-bold text-center">{user.denomination}</p>
        <p className="text-center">⭐ {user.stars_count}</p>
        <p className="w-full pt-4 pb-2"> Specialized in :</p>
        <p className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {user.specialities.join(" / ")}
        </p>
      </div>
    </div>
  );
};

export default User;
