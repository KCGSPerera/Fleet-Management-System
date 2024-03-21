import * as React from "react";
import { color } from "d3-color";
import LiquidFillGauge from "react-liquid-gauge";

export default function DieselTank() {
  const [value, setValue] = React.useState(80);

  const radius = 200;
  let fillColor;

  if (value < 10) {
    fillColor = "#FF0000"; // Red if value < 10%
  } else if (value > 75) {
    fillColor = "#4CCEAC"; // Orange if value > 75%
  } else {
    fillColor = "#FFA500"; // Default color for other cases
  }

  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%"
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%"
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%"
    }
  ];

  return (
    <div
      className="position-relative"
      style={{
        maxWidth: "250px"
      }}
    >
      <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
        Diesel Level
      </p>
      <LiquidFillGauge
        style={{ margin: "0 auto" }}
        width={200}
        height={200}
        value={value}
        percent="%"
        textSize={1}
        textOffsetX={0}
        textOffsetY={0}
        textRenderer={(props) => {
          const roundedValue = Math.round(props.value);
          const radius = Math.min(props.height / 2, props.width / 2);
          const textPixels = (props.textSize * radius) / 2;
          let valueStyle = {
            fontSize: textPixels,
            fill: value < 10 ? "#FF0000" : "#fff", // Red if value < 10%, white otherwise
          };
          let percentStyle = {
            fontSize: textPixels * 0.6,
            fill: value < 10 ? "#FF0000" : "#fff", // Red if value < 10%, white otherwise
          };

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>
                {roundedValue}
              </tspan>
              <tspan style={percentStyle}>{props.percent}</tspan>
            </tspan>
          );
        }}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        gradient
        gradientStops={gradientStops}
        circleStyle={{
          fill: fillColor
        }}
        waveStyle={{
          fill: fillColor
        }}
        textStyle={{
          fill: color("#444").toString(),
          fontFamily: "Arial"
        }}
        waveTextStyle={{
          fill: color("#fff").toString(),
          fontFamily: "Arial"
        }}
      />
    </div>
  );
}
