
export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: number;
  volume: number;
  avgVolume: number;
  high52Week: number;
  low52Week: number;
}

export interface StockPrediction {
  symbol: string;
  recommendation: 'buy' | 'sell' | 'hold';
  confidenceScore: number;
  predictedPrice: number;
  timeframe: '1d' | '1w' | '1m' | '3m';
  predictedChange: number;
}

export interface ChartData {
  date: string;
  value: number;
}

export interface StockHistoryData {
  symbol: string;
  history: ChartData[];
}
