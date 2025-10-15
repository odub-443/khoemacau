import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router";

// Assume these icons are imported from an icon library
import {
  BoxCubeIcon,
  CalenderIcon,
  ChevronDownIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <GridIcon />,
    name: "Dashboard",
    subItems: [{ name: "Analytics", path: "/", pro: false }],
  },
  {
    icon: <CalenderIcon />,
    name: "Calendar",
    path: "/calendar",
  },
  {
    name: "Forms",
    path: '/forms',
    icon: <ListIcon />,
    subItems: [
    {
      path: "/form-dahi",
      name: "Development AHI",
      pro: false,
    },
    {
      path: "/form-asa",
      name: "Active Stope Audit",
      pro: false,
    },
    {
      path: "/form-dipto",
      name: "Drilling Inspection PTO",
      pro: false,
    },
    {
      path: "/form-oi",
      name: "Orepass Inspection",
      pro: false,
    },
    {
      path: "/form-fpto",
      name: "Fibrecrete PTO",
      pro: false,
    },
    {
      path: "/form-pahi",
      name: "Production AHI",
      pro: false,
    },
    {
      path: "/form-scipto",
      name: "Stope Charging Ins. PTO",
      pro: false,
    },
    {
      path: "/form-pdpto",
      name: "Production Drilling PTO",
      pro: false,
    },
    {
      path: "/form-pcpc",
      name: "Pumpstation CPC",
      pro: false,
    },
    {
      path: "/form-rci",
      name: "Refuge Chamber Ins.",
      pro: false,
    }],
  },
  {
    name: "Data",
    icon: <TableIcon />,
    subItems: [
    {
      path: "/table-dahi",
      name: "Development AHI",
      pro: false,
    },
    {
      path: "/table-asa",
      name: "Active Stope Audit",
      pro: false,
    },
    {
      path: "/table-dipto",
      name: "Drilling Inspection PTO",
      pro: false,
    },
    {
      path: "/table-oi",
      name: "Orepass Inspection",
      pro: false,
    },
    {
      path: "/table-fpto",
      name: "Fibrecrete PTO",
      pro: false,
    },
    {
      path: "/table-pahi",
      name: "Production AHI",
      pro: false,
    },
    {
      path: "/table-scipto",
      name: "Stope Charging Ins. PTO",
      pro: false,
    },
    {
      path: "/table-pdpto",
      name: "Production Drilling PTO",
      pro: false,
    },
    {
      path: "/table-pcpc",
      name: "Pumpstation CPC",
      pro: false,
    },
    {
      path: "/table-rci",
      name: "Refuge Chamber Ins.",
      pro: false,
    }
    ],
  }
];

const othersItems: NavItem[] = [
  {
    icon: <PieChartIcon />,
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    icon: <BoxCubeIcon />,
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
  {
    icon: <PlugInIcon />,
    name: "Authentication",
    subItems: [
      { name: "Sign In", path: "/signin", pro: false },
      { name: "Sign Up", path: "/signup", pro: false },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Enhanced active path checking
  const isActive = useCallback(
    (path: string) => {
      // Exact match
      if (location.pathname === path) return true;
      
      // For root path, only match exactly
      if (path === "/") return location.pathname === "/";
      
      // For other paths, check if current path starts with the menu path
      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

  // Check if a parent menu item should be considered active
  const isParentActive = useCallback(
    (nav: NavItem) => {
      // Check if the parent path is active
      if (nav.path && isActive(nav.path)) return true;
      
      // Check if any sub-item is active
      if (nav.subItems) {
        return nav.subItems.some(subItem => isActive(subItem.path));
      }
      
      return false;
    },
    [isActive]
  );

  // Check if submenu should be open based on active routes
  const shouldSubmenuBeOpen = useCallback(
    (nav: NavItem, index: number, menuType: "main" | "others") => {
      if (!nav.subItems) return false;
      
      // Check if parent path is active
      if (nav.path && isActive(nav.path)) return true;
      
      // Check if any sub-item path is active
      return nav.subItems.some(subItem => isActive(subItem.path));
    },
    [isActive]
  );

  useEffect(() => {
    let foundActiveSubmenu = false;
    
    // Check main items
    navItems.forEach((nav, index) => {
      if (shouldSubmenuBeOpen(nav, index, "main")) {
        setOpenSubmenu({ type: "main", index });
        foundActiveSubmenu = true;
      }
    });
    
    // Check others items if no main item was found
    if (!foundActiveSubmenu) {
      othersItems.forEach((nav, index) => {
        if (shouldSubmenuBeOpen(nav, index, "others")) {
          setOpenSubmenu({ type: "others", index });
          foundActiveSubmenu = true;
        }
      });
    }

    // If no submenu should be open, close all
    if (!foundActiveSubmenu) {
      setOpenSubmenu(null);
    }
  }, [location, shouldSubmenuBeOpen]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                isParentActive(nav) || (openSubmenu?.type === menuType && openSubmenu?.index === index)
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  isParentActive(nav) || (openSubmenu?.type === menuType && openSubmenu?.index === index)
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <div style={{paddingLeft: 40, paddingRight: 40}}>
              <img
                src="/images/logo/logo.webp"
                alt="Logo"
                width='100%'
              />
            </div>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
            <div className="">
              {/* <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Others"
                ) : (
                  <HorizontaLDots />
                )}
              </h2> */}
              {/* {renderMenuItems(othersItems, "others")} */}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default AppSidebar;