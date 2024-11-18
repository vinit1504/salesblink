/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import downlaod from "./../assets/download.png";
import { navigation } from "./../config/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [expandedTab, setExpandedTab] = useState(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); 
  };

  const handleToggleSubHeader = (tabName) => {
    setExpandedTab(expandedTab === tabName ? null : tabName);
  };

  return (
    <Disclosure as="nav" className="bg-white shadow-md">
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-10">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-200 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src={downlaod} className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => handleTabClick(item.name)}
                    className={classNames(
                      item.name === activeTab
                        ? "bg-gray-300 text-black"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
                      "rounded-md px-3 py-2 text-[18px] font-medium flex flex-row items-center gap-3 "
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-white p-1 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none"
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Your Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Settings
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/logout"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Sign out
                  </Link>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile menu and SubHeader */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <Disclosure key={item.name}>
              {({ open }) => (
                <>
                  <DisclosureButton
                    as={Link}
                    to={item.href}
                    onClick={() => {
                      handleTabClick(item.name); 
                      handleToggleSubHeader(item.name);
                    }}
                    aria-current={item.name === activeTab ? "page" : undefined}
                    className={classNames(
                      item.name === activeTab
                        ? "bg-indigo-500 text-white"
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </DisclosureButton>
                  {expandedTab === item.name && item.subItems && (
                    <DisclosurePanel className="pl-4">
                      <div>
                        {item.subItems.map((subItem, index) => (
                          <DisclosureButton
                            key={index}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                          >
                            <Link
                              to={subItem.path}
                              className="font-semibold px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2 text-[16px]"
                              onClick={() => {
                                setExpandedTab(null);
                              }}
                            >
                              {subItem.icon}
                              {subItem.name}
                            </Link>
                          </DisclosureButton>
                        ))}
                      </div>
                    </DisclosurePanel>
                  )}
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
