"use client";

import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";
import { ModeToggleComponent } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  Cross1Icon,
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function DrawerComponent() {
  const menus = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Front End Developer",
      href: "/front-end-developer",
    },
    {
      title: "Mining Engineer",
      href: "/mining-engineer",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  const menuIcons = [
    {
      icon: <GitHubLogoIcon className="h-6 w-6" />,
      href: "https://github.com/dionpramana",
    },
    {
      icon: <LinkedInLogoIcon className="h-6 w-6" />,
      href: "https://www.linkedin.com/in/dionpramana/",
    },
    {
      icon: <InstagramLogoIcon className="h-6 w-6" />,
      href: "https://www.instagram.com/dionpramana/",
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost">
          <MenuIcon className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[80vh] p-6]">
        <div className="flex flex-col h-full justify-center space-y-4">
          {menus.map((menu, index) => {
            return (
              <div key={index} className="flex justify-center">
                <Link href={menu.href}>
                  <DrawerClose>
                    <Button variant="link" className="text-5xl font-bold">
                      {menu.title}
                    </Button>
                  </DrawerClose>
                </Link>
              </div>
            );
          })}

          <div className="flex justify-center mt-[32px]">
            {menuIcons.map((menuIcon, index) => {
              return (
                <div key={index}>
                  <Link href={menuIcon.href}>
                    <DrawerClose>
                      <Button variant="link">{menuIcon.icon} </Button>
                    </DrawerClose>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
