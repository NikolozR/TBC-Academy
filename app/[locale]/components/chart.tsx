"use client";
import Link from "next/link";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useAppContext } from "../../context/index";
import { useEffect } from "react";
import { cartCount } from "../actions";

export default function Chart() {
  const { state, setState } = useAppContext();

  useEffect(() => {
    async function getcart() {
      const count = await cartCount();
      setState(count);
    }

    getcart();
  }, [setState]);

  return (
    <div className="text-xl relative">
      <Link href="/checkout">
        <span className="icon-bg absolute text-[11px] font-bold top-[-17px] right-[-14px] text-white flex items-center justify-center">
          {state ? state : "0"}
        </span>
        <MdOutlineShoppingCart suppressHydrationWarning />
      </Link>
    </div>
  );
}