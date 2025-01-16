import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";

export default function App() {
    return (
        <Navbar isBordered className="bg-[var(--background)]">
            {/* Left Content: Logo */}
            <NavbarContent>
                <NavbarBrand>
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/logo.png" // Replace with the actual path to your logo
                            alt="226 Coffee Logo"
                            width={40} // Set a fixed width
                            height={40} // Set a fixed height
                            priority // Ensures fast loading
                        />
                        <p className="font-bold text-inherit ml-2">226&apos;s Cafe</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
        </Navbar>
    );
}
