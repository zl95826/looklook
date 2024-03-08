"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
type LinkType = { name: string; url: string };
const bar: LinkType[] = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about" },
];
const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const offcanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const func = (event: MouseEvent) => {
      console.log(event.target);
      if (
        offcanvasRef.current &&
        !offcanvasRef.current.contains(event.target as Node)
      )
        setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", func);
    }
    return () => {
      document.removeEventListener("mousedown", func);
    };
  }, [open]);

  return (
    <>
      <nav className="flex items-center justify-between p-24">
        <div>Logo</div>
        <div className="block lg:hidden">
          {/* <div className="block lg:hidden"> */}
          <button
            className="flex items-center px-3 py-2 border rounded text-white-200 border-white-400 hover:text-white hover:border-white"
            onClick={() => {
              setOpen((pre) => !pre);
            }}
          >
            <svg
              className="fill-white h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-5">
          {bar.map((ele) => (
            <Link href={ele.url} key={ele.name}>
              {ele.name}
            </Link>
          ))}
        </div>
      </nav>

      <div
        className={`offcanvas-backdrop ${open ? "show" : ""} lg:hidden`}
      ></div>
      <div
        ref={offcanvasRef}
        className={`offcanvas ${
          open ? "show" : ""
        } flex flex-col justify-center items-center lg:hidden`}
      >
        <div>Logo</div>
        {bar.map((ele) => (
          <Link
            href={ele.url}
            key={ele.name}
            className="py-4"
            onClick={() => {
              setOpen((pre) => !pre);
            }}
          >
            {ele.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;

//use the rafce live template for new components.
