import { useContext } from "react";
import "../../src/css/toggleButton.css";
import { AuthContext } from "../Provider/AuthProvider";

const ToggleButton = () => {
  return (
    <div className="flex items-center gap-2">
      {" "}
      <span className="text-lg font-semibold">Light</span>
      <label className="switch">
        <input type="checkbox" />
        <span className="slider"></span>
      </label>
      <span className="text-lg font-semibold">Dark</span>
    </div>
  );
};

export default ToggleButton;
