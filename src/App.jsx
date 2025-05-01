import * as React from "react";
import { useState } from "react";
import { Map, Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { basestyle } from "./basestyle";

const InputField = ({ inputValue, setInputValue }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 10,
        left: 10,
        background: "white",
        padding: "8px",
        borderRadius: "4px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 1,
        display: "flex",
        gap: "8px",
      }}
    >
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter username"
      />
    </div>
  );
};

function App() {
  const [inputValue, setInputValue] = useState("");

  const mainLayer = {
    type: "line",
    "source-layer": "main",
    paint: {
      "line-color": "#000000",
      "line-width": 2,
    },
  };

  const highlightLayer = {
    type: "line",
    "source-layer": "main",
    filter: ["in", "|" + inputValue + "|", ["get", "username"]],
    paint: {
      "line-color": "#FF0000",
      "line-width": 2,
    },
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <InputField inputValue={inputValue} setInputValue={setInputValue} />
      <Map
        initialViewState={{
          longitude: 19.6,
          latitude: 48.7,
          zoom: 7.5,
          maxZoom: 30,
        }}
        style={{ width: "100%", height: "100%" }}
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
          <Layer {...highlightLayer} />
        </Source>
      </Map>
    </div>
  );
}

export default App;
