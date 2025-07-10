import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-green-900 text-white p-2 w-full mt-10">
      Built by{" "}
      <Link href="https://github.com/ArnobDas57" className="text-blue-300">
        Arnob Das
      </Link>{" "}
      © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
