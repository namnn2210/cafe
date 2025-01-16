import React from "react";
import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";

export default function App() {
    return (
        <Navbar isBordered className="bg-[var(--background)]">
            {/* Left Content: Logo */}
            <NavbarContent>
                <NavbarBrand>
                    <Link href="/" className="flex items-center">
                        <img
                            src="/logo.png" // Replace with the actual path to your logo
                            alt="226 Coffee Logo"
                            className="h-10 w-auto"
                        />
                        <p className="font-bold text-inherit ml-2">226's Cafe</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>
        </Navbar>
    );
}
