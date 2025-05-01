export const basestyle = {
  version: 8,
  name: "OSM",
  sources: {
    osm: {
      type: "raster",
      tiles: [
        "https://api.maptiler.com/maps/backdrop/{z}/{x}/{y}.png?key=s0FqtqF9Zr1sHkoAQZpq",
      ],
      tileSize: 512,
      attribution: "OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm",
      type: "raster",
      source: "osm",
      minzoom: 0,
      maxzoom: 19,
      paint: {
        "raster-opacity": 0.25,
      },
    },
  ],
};
