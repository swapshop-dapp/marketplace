"use client";

import Image from "next/image";

export const WalletListItem = ({ icon, name, }: { icon: any; name:string; }) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div>
        <Image
          loading="lazy"
          width={30}
          height={30}
          src={icon}
          alt={name}
        />
      </div>
      <span>{name}</span>
    </div>
  );
};