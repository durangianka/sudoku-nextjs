import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div className="md:absolute md:bottom-0 w-full bg-[#0F0F19] py-4 pl-6 text-white">
      <p>
        &copy;
        {new Date().getFullYear().toString()} -{" "}
        <Link href="https://www.linkedin.com/in/giancarlo-duran-4428351a6/">
          <u>Giancarlo Duran</u>
        </Link>
      </p>
    </div>
  );
}
