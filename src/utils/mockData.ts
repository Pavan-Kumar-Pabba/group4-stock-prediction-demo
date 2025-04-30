
import { StockData, StockPrediction, StockHistoryData } from '../types/stock';

export const mockStocks: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 178.72,
    change: 1.34,
    changePercent: 0.76,
    marketCap: 2800000000000,
    volume: 52304100,
    avgVolume: 60125000,
    high52Week: 199.62,
    low52Week: 143.90,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 417.88,
    change: 3.78,
    changePercent: 0.91,
    marketCap: 3100000000000,
    volume: 22539200,
    avgVolume: 24500000,
    high52Week: 420.82,
    low52Week: 307.47,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 163.98,
    change: -1.26,
    changePercent: -0.76,
    marketCap: 2050000000000,
    volume: 18762300,
    avgVolume: 23100000,
    high52Week: 187.23,
    low52Week: 120.21,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 182.41,
    change: 0.98,
    changePercent: 0.54,
    marketCap: 1900000000000,
    volume: 34216700,
    avgVolume: 40500000,
    high52Week: 185.36,
    low52Week: 118.35,
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 175.22,
    change: -3.49,
    changePercent: -1.95,
    marketCap: 558000000000,
    volume: 69420000,
    avgVolume: 75300000,
    high52Week: 299.29,
    low52Week: 138.80,
  },
  {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 474.15,
    change: 5.23,
    changePercent: 1.12,
    marketCap: 1210000000000,
    volume: 16548700,
    avgVolume: 18200000,
    high52Week: 531.49,
    low52Week: 279.40,
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 881.86,
    change: 15.44,
    changePercent: 1.78,
    marketCap: 2170000000000,
    volume: 38795200,
    avgVolume: 42130000,
    high52Week: 974.00,
    low52Week: 379.27,
  },
];

export const mockPredictions: StockPrediction[] = [
  {
    symbol: 'AAPL',
    recommendation: 'buy',
    confidenceScore: 87,
    predictedPrice: 195.45,
    timeframe: '1m',
    predictedChange: 9.36,
  },
  {
    symbol: 'MSFT',
    recommendation: 'hold',
    confidenceScore: 72,
    predictedPrice: 425.10,
    timeframe: '1m',
    predictedChange: 1.73,
  },
  {
    symbol: 'GOOGL',
    recommendation: 'buy',
    confidenceScore: 81,
    predictedPrice: 179.35,
    timeframe: '1m',
    predictedChange: 9.37,
  },
  {
    symbol: 'AMZN',
    recommendation: 'buy',
    confidenceScore: 76,
    predictedPrice: 198.50,
    timeframe: '1m',
    predictedChange: 8.82,
  },
  {
    symbol: 'TSLA',
    recommendation: 'sell',
    confidenceScore: 65,
    predictedPrice: 162.75,
    timeframe: '1m',
    predictedChange: -7.12,
  },
  {
    symbol: 'META',
    recommendation: 'hold',
    confidenceScore: 68,
    predictedPrice: 480.25,
    timeframe: '1m',
    predictedChange: 1.29,
  },
  {
    symbol: 'NVDA',
    recommendation: 'buy',
    confidenceScore: 91,
    predictedPrice: 950.00,
    timeframe: '1m',
    predictedChange: 7.73,
  },
];

export const generateMockChartData = (symbol: string, days = 30): StockHistoryData => {
  const data: { date: string; value: number }[] = [];
  let baseValue: number = 0;
  
  // Assign a base value based on the symbol
  switch (symbol) {
    case 'AAPL': baseValue = 170; break;
    case 'MSFT': baseValue = 400; break;
    case 'GOOGL': baseValue = 160; break;
    case 'AMZN': baseValue = 175; break;
    case 'TSLA': baseValue = 180; break;
    case 'META': baseValue = 450; break;
    case 'NVDA': baseValue = 850; break;
    default: baseValue = 100;
  }
  
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Add some randomness to create realistic looking chart
    const randomFactor = 0.98 + Math.random() * 0.04; // Random between 0.98 and 1.02
    baseValue = baseValue * randomFactor;
    
    data.push({
      date: date.toISOString().split('T')[0],
      value: parseFloat(baseValue.toFixed(2))
    });
  }
  
  return { symbol, history: data };
};

export const mockWatchlist = ['AAPL', 'MSFT', 'GOOGL', 'NVDA'];

export const popularStocks = ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'META', 'NVDA'];
