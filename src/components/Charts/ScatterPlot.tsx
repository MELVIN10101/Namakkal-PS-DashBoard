import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface ScatterPlotProps {
  data: Array<{ x: number; y: number; name?: string; }>;
  xLabel?: string;
  yLabel?: string;
  color?: string;
  showTrendLine?: boolean;
}

// Simple linear regression for trend line
const calculateTrendLine = (data: Array<{ x: number; y: number; }>) => {
  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.x, 0);
  const sumY = data.reduce((sum, point) => sum + point.y, 0);
  const sumXY = data.reduce((sum, point) => sum + point.x * point.y, 0);
  const sumXX = data.reduce((sum, point) => sum + point.x * point.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  const minX = Math.min(...data.map(d => d.x));
  const maxX = Math.max(...data.map(d => d.x));

  return {
    start: { x: minX, y: slope * minX + intercept },
    end: { x: maxX, y: slope * maxX + intercept }
  };
};

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  xLabel = 'X Axis',
  yLabel = 'Y Axis',
  color = '#3B82F6',
  showTrendLine = false
}) => {
  const trendLine = showTrendLine ? calculateTrendLine(data) : null;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-900 dark:text-white">
            {xLabel}: {data.x}
          </p>
          <p className="text-sm text-gray-900 dark:text-white">
            {yLabel}: {data.y}
          </p>
          {data.name && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {data.name}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />        <XAxis 
          type="number" 
          dataKey="x" 
          name={xLabel}
          tick={{ fontSize: 12, fill: '#6B7280' }}
          label={{ value: xLabel, position: 'insideBottom', offset: -10, style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 } }}
        />
        <YAxis 
          type="number" 
          dataKey="y" 
          name={yLabel}
          tick={{ fontSize: 12, fill: '#6B7280' }}
          label={{ value: yLabel, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12 } }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Scatter dataKey="y" fill={color} />
        {trendLine && (
          <ReferenceLine 
            segment={[
              { x: trendLine.start.x, y: trendLine.start.y },
              { x: trendLine.end.x, y: trendLine.end.y }
            ]}
            stroke="#EF4444"
            strokeWidth={2}
            strokeDasharray="5 5"
          />
        )}
      </ScatterChart>
    </ResponsiveContainer>
  );
};
