
import { StockData, StockPrediction } from '../types/stock';
import { mockPredictions } from './mockData';

export const getStockPrediction = (symbol: string): StockPrediction | undefined => {
  return mockPredictions.find(prediction => prediction.symbol === symbol);
};

export const getPredictionColor = (prediction: StockPrediction | undefined): string => {
  if (!prediction) return 'text-market-neutral';
  
  switch (prediction.recommendation) {
    case 'buy':
      return 'text-market-up';
    case 'sell':
      return 'text-market-down';
    case 'hold':
    default:
      return 'text-market-neutral';
  }
};

export const getPredictionBadgeClass = (recommendation: 'buy' | 'sell' | 'hold'): string => {
  switch (recommendation) {
    case 'buy':
      return 'prediction-badge prediction-badge-buy';
    case 'sell':
      return 'prediction-badge prediction-badge-sell';
    case 'hold':
    default:
      return 'prediction-badge prediction-badge-hold';
  }
};

export const formatLargeNumber = (num: number): string => {
  if (num >= 1000000000000) {
    return `$${(num / 1000000000000).toFixed(2)}T`;
  }
  if (num >= 1000000000) {
    return `$${(num / 1000000000).toFixed(2)}B`;
  }
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(2)}M`;
  }
  return `$${num.toLocaleString()}`;
};
