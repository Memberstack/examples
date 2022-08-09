import msAvatar from "@/app/assets/memberstack-avatar.png";
import msLogo from "@/app/assets/memberstack-logo.svg";
import { Disclosure, Menu, Transition, Dialog } from "@headlessui/react";
import { MenuAlt1Icon, XIcon, BellIcon } from "@heroicons/react/outline";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { useAuth, useMemberstackModal, useMember } from "@memberstack/react";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, forwardRef } from "react";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigation = [{ name: "Dashboard", href: "/", current: true }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const BrandLogo = forwardRef(({ onClick, href }, ref) => {
  return (
    <a
      href={href}
      onClick={onClick}
      ref={ref}
      className="flex h-16 w-16 items-center justify-center bg-gray-800 md:w-20"
    >
      <Image src={msLogo} alt="Memberstack logo" height="40" width="40" />
      {/* <img
        className="h-8 w-auto"
        src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
        alt="Workflow"
      /> */}
    </a>
  );
});

const NavBar = ({ color = "bg-gray-800" }) => {
  const { signOut, isLoggedIn } = useAuth();
  const { member } = useMember();
  const { openModal, hideModal } = useMemberstackModal();

  const userNavigation = [
    { name: "Profile", action: () => openModal({ type: "PROFILE" }) },
    { name: "Sign out", action: async () => await signOut() },
  ];

  return (
    <Disclosure as="nav" className={` ${color} md:bg-transparent`}>
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              {/* Logo area */}
              <div className="flex-shrink-0">
                <Link href="/" passHref>
                  <BrandLogo />
                </Link>
              </div>

              {/* Search section */}

              <div className="flex lg:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-indigo-400 hover:text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuAlt1Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>

              {/* Links section */}
              <div className="hidden lg:block lg:w-80">
                <div className="flex items-center justify-end">
                  {/* Profile dropdown */}
                </div>
              </div>
            </div>
          </div>

          {/* mobile menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full">
                    <Image
                      src={msAvatar}
                      alt="user avatar"
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {member?.id}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {member?.auth?.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="button"
                    onClick={item.action}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
