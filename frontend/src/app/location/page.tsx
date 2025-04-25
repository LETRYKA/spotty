"use client";

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = "pk.eyJ1IjoiYmFsa2FuYW9wcGEiLCJhIjoiY205dXUwcHM4MGYyZjJrcTByemN1ZWp5MyJ9.sxemiJPgp0W7lsEdhSePEw";

const Map = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/balkanaoppa/cm9vjzngv00i401s06zr61vb2",
      center: [-77.04, 38.907],
      zoom: 13,
      pitch: 60,
      bearing: -17.6,
      antialias: true,
    });

    mapRef.current = map;

    map.on("load", () => {
      // 3D Terrain
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.terrain-rgb",
        tileSize: 512,
        maxzoom: 14,
      });
      map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });

      // 3D Buildings
      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",
          "fill-extrusion-height": ["get", "height"],
          "fill-extrusion-base": ["get", "min_height"],
          "fill-extrusion-opacity": 0.6,
        },
      });

      // MARKER DATA (GeoJSON)
      map.addSource("places", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {
                description: "<strong>Capital Pride Parade</strong><p>4:30 p.m. Free.</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [106.9177016, 47.9184676],
              },
            },
            {
              type: "Feature",
              properties: {
                description: "<strong>Big Backyard Bash</strong><p>Food, wine, fun.</p>",
              },
              geometry: {
                type: "Point",
                coordinates: [-77.090372, 38.881189],
              },
            },
          ],
        },
      });
      

      // ADD CIRCLE MARKERS
      map.addLayer({
        id: "places",
        type: "circle",
        source: "places",
        paint: {
          "circle-color": "#ff5500",
          "circle-radius": 8,
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff",
        },
      });

      // ADD POPUP
      const popup = new mapboxgl.Popup({ closeButton: false, closeOnClick: false });

      map.on("mouseenter", "places", (e) => {
        map.getCanvas().style.cursor = "pointer";
        const coords = e.features?.[0]?.geometry?.coordinates.slice();
        const desc = e.features?.[0]?.properties?.description;

        if (coords && desc) {
          popup.setLngLat(coords).setHTML(desc).addTo(map);
        }
      });

      map.on("mouseleave", "places", () => {
        map.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapContainerRef} className="w-screen h-screen" />;
};

export default Map;
