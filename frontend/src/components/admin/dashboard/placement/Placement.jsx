import React from "react";
import DriveList from "./DriveList";
import PlacedCarousal from "./PlacedCarousal";

const Placement = () => {
  return (
    <div>
      <div>
        {" "}
        <h1 style={{ fontSize: 30, color: "#84CEE4", fontWeight: "bold" }}>
          Congratulating!
        </h1>
        <PlacedCarousal />
      </div>

      <DriveList />
    </div>
  );
};

export default Placement;
