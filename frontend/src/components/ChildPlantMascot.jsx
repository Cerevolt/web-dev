import React from "react";
import "./ChildPlantMascot.css";

const ChildPlantMascot = () => {
  return (
    <div className="plant-mascot">
      <div className="plant-message">
        You're doing great! 🌟
      </div>

      <div className="plant-character">
        <div className="plant-leaves">
          <span className="plant-leaf left-leaf">🌿</span>
          <span className="plant-leaf right-leaf">🌿</span>
        </div>

        <div className="plant-face">
          <span className="plant-eye"></span>
          <span className="plant-eye"></span>
          <span className="plant-smile">⌣</span>
        </div>

        <div className="plant-pot">
          <span>🪴</span>
        </div>
      </div>

      <p className="plant-name">Sprout</p>
      <span className="plant-caption">Your little buddy</span>
    </div>
  );
};

export default ChildPlantMascot;