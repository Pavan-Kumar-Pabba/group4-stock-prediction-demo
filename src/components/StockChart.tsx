
import { useState, useEffect } from "react";
import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, TooltipProps } from "recharts";
import { ChartData } from "../types/stock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface StockChartProps {
  data: ChartData[];
  symbol: string;
  isLoading: boolean;
}

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const date = new Date(label);
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });

    return (
      <div className="custom-tooltip bg-popover border border-border shadow-md rounded-md p-3">
        <p className="font-medium">{formattedDate}</p>
        <p className="text-lg font-bold">${value?.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-1">Click to view details</p>
      </div>
    );
  }
  return null;
};

export function StockChart({ data, symbol, isLoading }: StockChartProps) {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '3m' | '1y'>('30d');
  const [chartData, setChartData] = useState<ChartData[]>(data);
  
  // Update chart data when data or timeframe changes
  useEffect(() => {
    if (data && data.length > 0) {
      let filteredData = [...data];
      
      // Filter data based on the selected timeframe
      if (timeframe === '7d') {
        filteredData = data.slice(-7);
      } else if (timeframe === '30d') {
        filteredData = data;
      } else if (timeframe === '3m') {
        // In real app we'd load more data, here we'll just use what we have
        filteredData = data;
      } else if (timeframe === '1y') {
        // In real app we'd load more data, here we'll just use what we have
        filteredData = data;
      }
      
      setChartData(filteredData);
    }
  }, [data, timeframe]);
  
  const priceChange = chartData.length >= 2
    ? chartData[chartData.length - 1].value - chartData[0].value
    : 0;
  
  const priceChangePercent = chartData.length >= 2
    ? (priceChange / chartData[0].value) * 100
    : 0;
    
  const chartColor = priceChange >= 0 ? "var(--market-up)" : "var(--market-down)";
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle>{symbol} Price Chart</CardTitle>
          <div className="flex space-x-1">
            <Button 
              variant={timeframe === '7d' ? "default" : "outline"} 
              size="sm"
              onClick={() => setTimeframe('7d')}
            >
              7D
            </Button>
            <Button 
              variant={timeframe === '30d' ? "default" : "outline"} 
              size="sm"
              onClick={() => setTimeframe('30d')}
            >
              30D
            </Button>
            <Button 
              variant={timeframe === '3m' ? "default" : "outline"} 
              size="sm"
              onClick={() => setTimeframe('3m')}
            >
              3M
            </Button>
            <Button 
              variant={timeframe === '1y' ? "default" : "outline"} 
              size="sm"
              onClick={() => setTimeframe('1y')}
            >
              1Y
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-[300px]">
            <div className="animate-pulse-subtle">Loading chart data...</div>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="text-3xl font-bold">
                ${chartData.length > 0 ? chartData[chartData.length - 1].value.toFixed(2) : "—"}
              </div>
              <div className={`flex items-center ${priceChange >= 0 ? 'text-market-up' : 'text-market-down'}`}>
                <span>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                </span>
                <span className="text-muted-foreground text-sm ml-2">
                  {timeframe === '7d' ? 'Past Week' : timeframe === '30d' ? 'Past Month' : timeframe === '3m' ? 'Past 3 Months' : 'Past Year'}
                </span>
              </div>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                      <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(date) => {
                      if (timeframe === '7d') return new Date(date).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' });
                      return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    }}
                  />
                  <YAxis 
                    orientation="right"
                    tick={{ fontSize: 12 }}
                    domain={['auto', 'auto']}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: 'var(--border)',
                      strokeWidth: 1,
                      strokeDasharray: "4 4"
                    }}
                    wrapperStyle={{ outline: 'none' }}
                    position={{ y: 0 }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={chartColor} 
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    activeDot={{ 
                      r: 6, 
                      stroke: 'var(--background)',
                      strokeWidth: 2,
                      fill: chartColor 
                    }}
                    isAnimationActive={true}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        This chart is based on historical market data. Predictions are for educational purposes only.
      </CardFooter>
    </Card>
  );
}

export default StockChart;
