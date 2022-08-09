import { useState } from "react";
import {
  ArchiveIcon,
  BanIcon,
  FlagIcon,
  InboxIcon,
  PencilAltIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import Switch from "@/components/Switch";
import DashboardNavBar from "./dashboard/NavBar";
import NavBar from "./NavBar";
import NavBar2 from "@/components/NavBar/NavBar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const sidebarNavigation = [
  { name: "Open", href: "#", icon: InboxIcon, current: true },
  { name: "Archive", href: "#", icon: ArchiveIcon, current: false },
  { name: "Customers", href: "#", icon: UserCircleIcon, current: false },
  { name: "Flagged", href: "#", icon: FlagIcon, current: false },
  { name: "Spam", href: "#", icon: BanIcon, current: false },
  { name: "Drafts", href: "#", icon: PencilAltIcon, current: false },
];

const BasicLayout = ({ children }) => (
  <div className="h-screen flex flex-col bg-[#282c34]">
    <NavBar color={"bg-[#282c34]"} />
    <main className="mx-auto my-auto max-w-7xl px-4">{children}</main>
  </div>
);

const ContentLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <DashboardNavBar />
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        </div>
      </header>
      <main className="w-screen overflow-auto">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
};

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      <NavBar2 />
      {/* Bottom section */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Narrow sidebar*/}
        <nav
          aria-label="Sidebar"
          className="hidden md:block md:flex-shrink-0 md:overflow-y-auto md:bg-gray-800"
        >
          <div className="relative flex w-20 flex-col space-y-3 p-3">
            {sidebarNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-400 hover:bg-gray-700",
                  "flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg"
                )}
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
        {/* Main content */}
        <div className="flex flex-col">
          <main className="min-w-0 flex-1 border-t border-gray-200 lg:flex">
            {/* Primary column */}
            <section
              aria-labelledby="primary-heading"
              className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto lg:order-last"
            >
              <h1 id="primary-heading" className="sr-only">
                Home
              </h1>
              {/* Your content */}
              {children}
            </section>

            {/* Secondary column (hidden on smaller screens) */}
            <aside className="hidden lg:order-first lg:block lg:flex-shrink-0">
              <div className="relative flex h-full w-96 flex-col overflow-y-auto border-r border-gray-200 bg-gray-100">
                {/* Your content */}x
              </div>
            </aside>
          </main>
        </div>
      </div>
    </div>
  );
};

const withLayout = (Page, variant) => (props) =>
  (
    <Switch expression={variant} fallback={<Page {...props} />}>
      <BasicLayout case="basic">
        <Page {...props} />
      </BasicLayout>
      <DashboardLayout case="dashboard">
        <Page {...props} />
      </DashboardLayout>
      <ContentLayout case="content">
        <Page {...props} />
      </ContentLayout>
    </Switch>
  );

export default withLayout;
