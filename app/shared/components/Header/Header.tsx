"use client";

import { alfa_Slab_One } from "@app/shared/fonts";
import Burger from "@app/shared/icons/Burger";
import Logo from "@app/shared/icons/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthModal from "../AuthModal";
import ToggleTheme from "../ToggleTheme";

export default function Header() {
  const pathname = usePathname();
  const navLink = {
    Главная: "/",
    Блоги: "/blogs",
    Авторы: "/autors",
    Подписки: "/subscriptions",
  };

  return (
    <div className="navbar bg-base-100 shadow-sm pl-10 pr-10">
      <div className="navbar-start">
        <div className="dropdown md:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <Burger />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {Object.entries(navLink).map(([name, path]) => (
              <li key={path} className="mb-2 relative z-10">
                <Link
                  href={path}
                  aria-current={pathname === path ? "page" : undefined}
                  className={`${
                    pathname === path
                      ? "text-primary font-bold border-primary"
                      : "text-base-content hover:text-primary"
                  } px-4 py-2 font-medium transition-colors z-100`}
                >
                  {name}
                </Link>
              </li>
            ))}
            <ToggleTheme className="m-4 flex md:hidden" />
          </ul>
        </div>
        <Link
          href="/"
          className="hidden sm:flex sm:items-center"
          aria-label="ReedZen Home"
        >
          <Logo className="ml-8 md:ml-0" />
          <h1
            className={`${alfa_Slab_One.className} text-xl ml-4 text-primary`}
          >
            ReedZen
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1">
          {Object.entries(navLink).map(([name, path]) => (
            <li key={path}>
              <Link
                href={path}
                aria-current={pathname === path ? "page" : undefined}
                className={`${
                  pathname === path
                    ? "text-primary font-bold border-b-2 border-primary"
                    : "text-base-content hover:text-primary"
                } px-4 py-2 font-medium transition-colors`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <ToggleTheme className="mr-4 hidden md:flex hover:animate-bounce" />
        <AuthModal />
      </div>
    </div>
  );
}
