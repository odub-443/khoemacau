import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { MoreDotIcon } from "../../icons";

export default function MonthlySafetyTarget() {
  const series = [89.2];
  const options: ApexOptions = {
    colors: ["#7B6955"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#7B6955"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Safety Compliance"],
  };
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Monthly Safety Target
            </h3>
          </div>
          <div className="relative inline-block">
            <button className="dropdown-toggle" onClick={toggleDropdown}>
              <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                View More
              </DropdownItem>
              <DropdownItem
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Delete
              </DropdownItem>
            </Dropdown>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center -mt-6">
          <Chart
            options={options}
            series={series}
            type="radialBar"
            height={330}
          />
        </div>

        <div className="flex items-center justify-between gap-5 mt-4">
          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Findings Last Week
            </p>
            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
              12
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.38861 2.08243 8.58985 2.18084 8.7273 2.33683L12.6922 6.30178C12.893 6.50259 13.0049 6.77258 13.0049 7.0538C13.0049 7.61869 12.5484 8.07521 11.9835 8.07521H9.00488V13.8247C9.00488 14.3896 8.54836 14.8461 7.98345 14.8461C7.41855 14.8461 6.96203 14.3896 6.96203 13.8247V8.07521H3.98335C3.41846 8.07521 2.96194 7.61869 2.96194 7.0538C2.96194 6.77258 3.07386 6.50259 3.27467 6.30178L7.23962 2.33683Z"
                  fill="#039855"
                />
              </svg>
            </p>
          </div>

          <div className="w-px bg-gray-200 h-7 dark:bg-gray-800"></div>

          <div>
            <p className="mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm">
              Target
            </p>
            <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg">
              95%
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.38861 2.08243 8.58985 2.18084 8.7273 2.33683L12.6922 6.30178C12.893 6.50259 13.0049 6.77258 13.0049 7.0538C13.0049 7.61869 12.5484 8.07521 11.9835 8.07521H9.00488V13.8247C9.00488 14.3896 8.54836 14.8461 7.98345 14.8461C7.41855 14.3896 6.96203 14.3896 6.96203 13.8247V8.07521H3.98335C3.41846 8.07521 2.96194 7.61869 2.96194 7.0538C2.96194 6.77258 3.07386 6.50259 3.27467 6.30178L7.23962 2.33683Z"
                  fill="#039855"
                />
              </svg>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}