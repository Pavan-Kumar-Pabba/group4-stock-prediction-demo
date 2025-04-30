
import { useState, useEffect } from 'react';
import { mockStocks, mockPredictions, generateMockChartData, mockWatchlist } from '../utils/mockData';
import { StockData, StockPrediction, StockHistoryData } from '../types/stock';
import { toast } from '@/components/ui/use-toast';

export function useStockData() {
  const [stocks, setStocks] = useState<StockData[]>(mockStocks);
  const [predictions, setPredictions] = useState<StockPrediction[]>(mockPredictions);
  const [watchlist, setWatchlist] = useState<string[]>(mockWatchlist);
  const [selectedStock, setSelectedStock] = useState<string>(mockStocks[0].symbol);
  const [chartData, setChartData] = useState<StockHistoryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const getStockBySymbol = (symbol: string): StockData | undefined => {
    return stocks.find(stock => stock.symbol === symbol);
  };
  
  const getPredictionBySymbol = (symbol: string): StockPrediction | undefined => {
    return predictions.find(prediction => prediction.symbol === symbol);
  };
  
  const getWatchlistStocks = (): StockData[] => {
    return stocks.filter(stock => watchlist.includes(stock.symbol));
  };
  
  const addToWatchlist = (symbol: string): void => {
    if (!watchlist.includes(symbol)) {
      setWatchlist([...watchlist, symbol]);
      toast({
        title: "Added to Watchlist",
        description: `${symbol} has been added to your watchlist.`,
        duration: 3000,
      });
    }
  };
  
  const removeFromWatchlist = (symbol: string): void => {
    setWatchlist(watchlist.filter(item => item !== symbol));
    toast({
      title: "Removed from Watchlist",
      description: `${symbol} has been removed from your watchlist.`,
      duration: 3000,
    });
  };
  
  const isInWatchlist = (symbol: string): boolean => {
    return watchlist.includes(symbol);
  };
  
  const fetchStockChartData = (symbol: string): void => {
    setIsLoading(true);
    // Simulate API call with a timeout
    setTimeout(() => {
      const data = generateMockChartData(symbol);
      setChartData(data);
      setSelectedStock(symbol);
      setIsLoading(false);
    }, 500);
  };
  
  // Initial load of chart data
  useEffect(() => {
    if (!chartData && selectedStock) {
      fetchStockChartData(selectedStock);
    }
  }, [selectedStock]);
  
  return {
    stocks,
    predictions,
    watchlist,
    selectedStock,
    chartData,
    isLoading,
    getStockBySymbol,
    getPredictionBySymbol,
    getWatchlistStocks,
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
    fetchStockChartData,
    setSelectedStock
  };
}
