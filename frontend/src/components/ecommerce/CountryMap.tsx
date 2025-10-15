// react plugin for creating vector maps
import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";

// Define the component props
interface CorridorMapProps {
  mapColor?: string;
}

const CorridorMap: React.FC<CorridorMapProps> = ({ mapColor }) => {
  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#7B6955",
          r: 4, // Custom radius for markers
        } as any, // Type assertion to bypass strict CSS property checks
      }}
      markersSelectable={true}
      markers={[
        {
          latLng: [1.2921, 36.8219],
          name: "Stope C-1",
          style: {
            fill: "#7B6955",
            borderWidth: 1,
            borderColor: "white",
            stroke: "#383f47",
          },
        },
        {
          latLng: [15.2504, 19.7276],
          name: "Corridor C-02",
          style: { fill: "#7B6955", borderWidth: 1, borderColor: "white" },
        },
        {
          latLng: [4.6091, -74.0817],
          name: "Stope 27",
          style: { fill: "#7B6955", borderWidth: 1, borderColor: "white" },
        },
        {
          latLng: [-25.0304, 25.2092],
          name: "Corridor C-03",
          style: {
            fill: "#7B6955",
            borderWidth: 1,
            borderColor: "white",
            strokeOpacity: 0,
          },
        },
      ]}
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#7B6955",
          stroke: "transparent",
        },
      }}
    />
  );
};

export default CorridorMap;