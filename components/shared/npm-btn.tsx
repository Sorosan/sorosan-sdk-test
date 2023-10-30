"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CORE_REGISTRY, REACT_REGISTRY } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export interface NpmBtnProps
    extends React.HTMLAttributes<HTMLElement> {
}

const links = [
    {
        label: "Core",
        href: CORE_REGISTRY
    },
    {
        label: "React",
        href: REACT_REGISTRY
    }
];
export const NpmBtn = ({ }: NpmBtnProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="h-10 px-4 py-2 
            inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
            bg-secondary text-secondary-foreground hover:bg-secondary/80">
                NPM
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {links.map((link, index) => {
                    return (
                        <DropdownMenuItem key={index}>
                            <Link className="w-full" href={link.href} rel="noopener noreferrer" target="_blank">
                                {link.label}
                            </Link>
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}