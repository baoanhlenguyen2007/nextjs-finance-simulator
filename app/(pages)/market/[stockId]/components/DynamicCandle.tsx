"use client";

import dynamic from "next/dynamic";

// Dynamically import the chart component with no SSR
const DynamicCandle = dynamic(() => import("./CandleChart"), {
  ssr: false,
});

export default DynamicCandle;
