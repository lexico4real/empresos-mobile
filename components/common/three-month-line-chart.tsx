import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';

interface LineChartProps {
  data: number[]; // Array of 3 numbers, one for each month
  months?: string[]; // Optional: custom month labels
  className?: string; // Optional: custom container className
}

const PADDING = 20;

export default function ThreeMonthLineChart({
  data,
  months = ['OCT', 'NOV', 'DEC'],
  className = '',
}: LineChartProps) {
  // Responsive width/height (fill parent)
  const SVG_WIDTH = 1; // 100% (relative)
  const SVG_HEIGHT = 1; // 100% (relative)
  const VIEWBOX_WIDTH = 300;
  const VIEWBOX_HEIGHT = 100;

  // Normalize data to fit chart height
  const minY = Math.min(...data);
  const maxY = Math.max(...data);
  const yRange = maxY - minY || 1;

  // X positions for 3 months
  const xPositions = [PADDING, VIEWBOX_WIDTH / 2, VIEWBOX_WIDTH - PADDING];

  // Y positions (invert because SVG y=0 is top)
  const yPositions = data.map(
    v => VIEWBOX_HEIGHT - PADDING - ((v - minY) / yRange) * (VIEWBOX_HEIGHT - 2 * PADDING)
  );

  // Build the path string
  const path = `M${xPositions[0]},${yPositions[0]} L${xPositions[1]},${yPositions[1]} L${xPositions[2]},${yPositions[2]}`;

  return (
    <View className={`w-full h-32 rounded-xl p-0 ${className}`}> {/* Card background and rounded corners */}
      <Svg
        className="w-full h-full"
        width="100%"
        height="100%"
        viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT + 30}`}
        preserveAspectRatio="none"
      >
        {/* X-axis */}
        <Line x1={PADDING} y1={VIEWBOX_HEIGHT - PADDING} x2={VIEWBOX_WIDTH - PADDING} y2={VIEWBOX_HEIGHT - PADDING} stroke="#333" strokeWidth="2" />
        {/* Month Labels */}
        {months.map((month, i) => (
          <SvgText
            key={month}
            x={xPositions[i]}
            y={VIEWBOX_HEIGHT - PADDING + 20}
            fontSize="12"
            fill="#333"
            textAnchor="middle"
          >
            {month}
          </SvgText>
        ))}
        {/* Line graph */}
        <Path d={path} fill="none" stroke="#2D8A78" strokeWidth="2" />
        {/* Dots and values */}
        {xPositions.map((x, i) => (
          <React.Fragment key={i}>
            <Circle cx={x} cy={yPositions[i]} r="4" fill="white" stroke="#2D8A78" strokeWidth="2" />
            <SvgText
              x={x}
              y={yPositions[i] - 10}
              fontSize="12"
              fill="#2D8A78"
              textAnchor="middle"
            >
              {`${typeof data[i] === 'number' ? data[i].toLocaleString() : data[i]}€`}
            </SvgText>
          </React.Fragment>
        ))}
      </Svg>
    </View>
  );
}