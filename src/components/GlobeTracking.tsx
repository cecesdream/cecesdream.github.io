import { motion } from "motion/react";
import type { RefObject } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Sphere,
  Graticule
} from "react-simple-maps";

import { useStickyScrollProgress } from "../hooks/useStickyScrollProgress";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Interactive Scroll-Driven SVG Globe
// 1/500th of the section is ~1.5px of scroll on a phone; finer steps only cost renders.
const globeProgress = (progress: number) => Math.round(progress * 500) / 500;

export default function GlobeTracking({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const progress = useStickyScrollProgress(sectionRef, globeProgress);
  // Phase 1 (0 to 0.5): Rotate
  // Phase 2 (0.5 to 1.0): Zoom into Liberia
  const rotProgress = Math.min(1, progress * 2);
  const zoomProgress = Math.max(0, (progress - 0.5) * 2);

  const rx = 100 - (rotProgress * 90.6);
  const ry = -40 + (rotProgress * 33.6);
  const scale = 240 + (zoomProgress * 1100);

  const snapRx = Math.round(rx * 10) / 10;
  const snapRy = Math.round(ry * 10) / 10;
  const snapScale = Math.round(scale);

  const markerOpacity = zoomProgress > 0.2 ? Math.min(1, (zoomProgress - 0.2) * 2) : 0;

  return (
    <div style={{ position: "relative" }} className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] aspect-square mx-auto group">
      <ComposableMap
        projection="geoOrthographic"
        projectionConfig={{
          rotate: [snapRx, snapRy, 0],
          scale: snapScale
        }}
        style={{ width: "100%", height: "100%" }}
        className="opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-xl"
      >
        <Sphere stroke="#D6D6DA" strokeWidth={0.5} fill="#F8F9FA" id="sphere" />
        <Graticule stroke="#EAEAEC" strokeWidth={0.5} />
        
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const isLiberia = geo.properties.name === "Liberia";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isLiberia ? "#BF0A30" : "#D6D6DA"}
                  stroke={isLiberia ? "#BF0A30" : "#FFFFFF"}
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none" },
                    pressed: { outline: "none" }
                  }}
                />
              );
            })
          }
        </Geographies>

        <Marker coordinates={[-9.4295, 6.4281]}>
          <motion.circle 
            style={{ opacity: markerOpacity }}
            r={4}
            fill="#BF0A30" 
          />
          <motion.circle 
            r={12}
            style={{ opacity: markerOpacity * 0.6 }}
            fill="#BF0A30" 
          />
        </Marker>
      </ComposableMap>

      {/* Dynamic Label that fades in as zooming finishes */}
      <motion.div 
         style={{ opacity: Math.max(0, (zoomProgress - 0.5) * 2) }} 
         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[calc(50%+1.5rem)] pointer-events-none mt-8 md:mt-16"
      >
        <span className="bg-bg text-accent text-[11px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full shadow-lg border border-border/50">
          Liberia
        </span>
      </motion.div>
    </div>
  );
}
