import * as React from "react";
import { Map, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { basestyle } from "./basestyle";

const mainLayer = {
  type: "line",
  "source-layer": "main",
  paint: {
    "line-color": "#000000",
    "line-width": 2,
  },
};

function App() {
  return (
    <Map
      initialViewState={{
        longitude: 19.145294,
        latitude: 48.735396,
        zoom: 10,
        maxZoom: 30,
      }}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle={basestyle}
    >
      <Source
        id="mainLayer"
        type="vector"
        tiles={[
          "https://hel1.your-objectstorage.com/yosmgm/tiles/{z}/{x}/{y}.pbf",
        ]}
        maxzoom={17}
        attribution="© OpenInfraMap contributors"
      >
        <Layer {...mainLayer} />
      </Source>
    </Map>
  );
}

export default App;
