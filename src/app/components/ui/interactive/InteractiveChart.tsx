import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { motion } from 'motion/react';

interface DataPoint {
  [key: string]: any;
}

interface InteractiveChartProps {
  data: DataPoint[];
  type?: 'line' | 'area' | 'bar';
  dataKeys: Array<{ key: string; color: string; name: string }>;
  xAxisKey: string;
  title?: string;
  height?: number;
}

export function InteractiveChart({
  data,
  type = 'line',
  dataKeys,
  xAxisKey,
  title,
  height = 300,
}: InteractiveChartProps) {
  const [chartType, setChartType] = useState(type);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border border-emerald-500/30 rounded-lg p-3 shadow-xl"
        >
          <div className="text-emerald-300 text-sm mb-2">{label}</div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-emerald-300/70">{entry.name}</span>
              </div>
              <span className="text-white font-medium">{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </motion.div>
      );
    }
    return null;
  };

  const renderChart = () => {
    const commonProps = {
      data,
      onMouseMove: (e: any) => {
        if (e && e.activePayload) {
          setTooltipData(e.activePayload[0].payload);
        }
      },
      onMouseLeave: () => setTooltipData(null),
    };

    const chartProps = {
      margin: { top: 10, right: 10, left: 0, bottom: 0 },
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps} {...chartProps}>
            <defs>
              {dataKeys.map((dk) => (
                <linearGradient key={dk.key} id={`gradient-${dk.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={dk.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={dk.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b98120" />
            <XAxis dataKey={xAxisKey} stroke="#10b98170" />
            <YAxis stroke="#10b98170" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {dataKeys.map((dk) => (
              <Area
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                stroke={dk.color}
                fill={`url(#gradient-${dk.key})`}
                strokeWidth={2}
                name={dk.name}
                opacity={activeKey === null || activeKey === dk.key ? 1 : 0.3}
                onMouseEnter={() => setActiveKey(dk.key)}
                onMouseLeave={() => setActiveKey(null)}
              />
            ))}
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b98120" />
            <XAxis dataKey={xAxisKey} stroke="#10b98170" />
            <YAxis stroke="#10b98170" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {dataKeys.map((dk) => (
              <Bar
                key={dk.key}
                dataKey={dk.key}
                fill={dk.color}
                name={dk.name}
                opacity={activeKey === null || activeKey === dk.key ? 1 : 0.3}
                onMouseEnter={() => setActiveKey(dk.key)}
                onMouseLeave={() => setActiveKey(null)}
              />
            ))}
          </BarChart>
        );

      default:
        return (
          <LineChart {...commonProps} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#10b98120" />
            <XAxis dataKey={xAxisKey} stroke="#10b98170" />
            <YAxis stroke="#10b98170" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            {dataKeys.map((dk) => (
              <Line
                key={dk.key}
                type="monotone"
                dataKey={dk.key}
                stroke={dk.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                name={dk.name}
                opacity={activeKey === null || activeKey === dk.key ? 1 : 0.3}
                onMouseEnter={() => setActiveKey(dk.key)}
                onMouseLeave={() => setActiveKey(null)}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-slate-900/50 border border-emerald-500/20 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {title && (
          <h3 className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            {title}
          </h3>
        )}

        {/* Chart Type Selector */}
        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-1">
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded transition-colors ${
              chartType === 'line'
                ? 'bg-emerald-400/20 text-emerald-400'
                : 'text-emerald-300/50 hover:text-emerald-300'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`p-2 rounded transition-colors ${
              chartType === 'area'
                ? 'bg-emerald-400/20 text-emerald-400'
                : 'text-emerald-300/50 hover:text-emerald-300'
            }`}
          >
            <Activity className="w-4 h-4" />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded transition-colors ${
              chartType === 'bar'
                ? 'bg-emerald-400/20 text-emerald-400'
                : 'text-emerald-300/50 hover:text-emerald-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>

      {/* Data Keys Legend */}
      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-emerald-500/10">
        {dataKeys.map((dk) => (
          <button
            key={dk.key}
            onMouseEnter={() => setActiveKey(dk.key)}
            onMouseLeave={() => setActiveKey(null)}
            className={`flex items-center gap-2 transition-opacity ${
              activeKey === null || activeKey === dk.key ? 'opacity-100' : 'opacity-40'
            }`}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: dk.color }}
            />
            <span className="text-emerald-300 text-sm">{dk.name}</span>
            {tooltipData && (
              <span className="text-white text-sm font-medium">
                {tooltipData[dk.key]?.toLocaleString()}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
