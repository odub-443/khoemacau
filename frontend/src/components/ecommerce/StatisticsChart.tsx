import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function SafetyStatisticsChart() {
  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      labels: {
        colors: "#6B7280",
      },
    },
    colors: ["#7B6955", "#9CB9FF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      height: 310,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "straight",
      width: [2, 2],
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
      },
    },
    markers: {
      size: 0,
      strokeColors: "#fff",
      strokeWidth: 2,
      hover: {
        size: 6,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: ["#6B7280"],
        },
      },
      title: {
        text: "Number of Events",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#1D2939",
        },
      },
    },
  };

  const series = [
    {
      name: "Safety Findings",
      data: [15, 20, 18, 25, 22, 30, 28, 35, 32, 40, 38, 45],
    },
    {
      name: "Near Misses",
      data: [5, 7, 6, 8, 10, 9, 11, 13, 12, 15, 14, 16],
    },
  ];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-col gap-5 mb-6 sm:flex-row sm:justify-between">
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Safety Statistics
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {/* Replaced ChartTab with button elements */}
          <button className="flex h-8 items-center justify-center rounded-lg bg-gray-200 px-3 text-sm font-semibold text-gray-800 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:bg-gray-700 dark:text-white/90 dark:hover:bg-gray-600">
            Yearly
          </button>
          <button className="flex h-8 items-center justify-center rounded-lg px-3 text-sm font-semibold text-gray-500 transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700">
            Weekly
          </button>
          <button className="flex h-8 items-center justify-center rounded-lg px-3 text-sm font-semibold text-gray-500 transition-colors duration-200 ease-in-out hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700">
            Monthly
          </button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 lg:gap-6">
        <div className="w-full">
          <Chart options={options} series={series} type="line" height={310} />
        </div>
      </div>
    </div>
  );
}