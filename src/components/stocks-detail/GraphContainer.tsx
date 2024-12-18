import { useEffect, useState } from "react";
import "./GraphContainer.scss";

interface GraphContainerType {
  price: number;
  percentageChange: number;
}

export default function GraphContainer({
  price,
  percentageChange,
}: GraphContainerType) {
  const [bars, setBars] = useState<
    Array<{ height: number; color: string; borderColor: string }>
  >([]);

  useEffect(() => {
    if (price) {
      const newBar = {
        height: price,
        color: percentageChange >= 0 ? "#b1f2ba" : "#ffc9c9",
        borderColor: percentageChange >= 0 ? "#35a249" : "#e13d3c",
      };

      setBars((prevBars) => [...prevBars, newBar]);
    }
  }, [price, percentageChange]);

  return (
    <div className="graph-container">
      <div className="graph-box">
        <div className="bars">
          {bars.map((bar, index) => (
            <div
              key={index}
              className="bar"
              style={{
                height: `${bar.height}px`,
                width: "20px",
                backgroundColor: bar.color,
              }}
            ></div>
          ))}
        </div>
      </div>
      <div className="x-axis">
        {Array.from({ length: 50 }, (_, index) => (
          <div key={index} className="x-axis-label">
            {index * 100}
          </div>
        ))}
      </div>
    </div>
  );
}
