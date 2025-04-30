
import { useState, useEffect } from "react";
import { useStockData } from "../hooks/useStockData";
import Navbar from "../components/Navbar";
import StockSearch from "../components/StockSearch";
import StockCard from "../components/StockCard";
import StockChart from "../components/StockChart";
import WatchlistSection from "../components/WatchlistSection";
import PredictionCard from "../components/PredictionCard";
import { formatLargeNumber } from "../utils/predictStock";
import { Card, CardContent } from "@/components/ui/card";
import { popularStocks } from "../utils/mockData";
import { ChevronDown, ChevronUp } from "lucide-react";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );
  
  const {
    stocks,
    predictions,
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
  } = useStockData();
  
  const currentStock = getStockBySymbol(selectedStock);
  const currentPrediction = getPredictionBySymbol(selectedStock);
  const watchlistStocks = getWatchlistStocks();
  
  // Toggle theme
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDarkMode(!isDarkMode);
  };
  
  // Initialize dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="container mx-auto px-4 py-6 space-y-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Stock Prediction Dashboard</h1>
          <StockSearch
            stocks={stocks}
            onSelectStock={(symbol) => {
              fetchStockChartData(symbol);
            }}
          />
        </div>
        
        {/* Selected Stock Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {chartData && (
              <StockChart
                data={chartData.history}
                symbol={selectedStock}
                isLoading={isLoading}
              />
            )}
          </div>
          
          <div className="space-y-6">
            {currentStock && currentPrediction && (
              <PredictionCard
                prediction={currentPrediction}
                stockPrice={currentStock.price}
              />
            )}
            
            {currentStock && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Stock Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Market Cap</span>
                      <span className="font-medium">{formatLargeNumber(currentStock.marketCap)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume</span>
                      <span className="font-medium">{currentStock.volume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg. Volume</span>
                      <span className="font-medium">{currentStock.avgVolume.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">52W High</span>
                      <span className="font-medium">${currentStock.high52Week.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">52W Low</span>
                      <span className="font-medium">${currentStock.low52Week.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        
        {/* Watchlist Section */}
        <WatchlistSection
          watchlistStocks={watchlistStocks}
          predictions={predictions}
          isInWatchlist={isInWatchlist}
          onAddToWatchlist={addToWatchlist}
          onRemoveFromWatchlist={removeFromWatchlist}
          onSelectStock={fetchStockChartData}
        />
        
        {/* Popular Stocks */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Popular Stocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stocks
              .filter(s => popularStocks.includes(s.symbol))
              .map((stock) => (
                <StockCard
                  key={stock.symbol}
                  stock={stock}
                  prediction={predictions.find(p => p.symbol === stock.symbol)}
                  isInWatchlist={isInWatchlist(stock.symbol)}
                  onAddToWatchlist={addToWatchlist}
                  onRemoveFromWatchlist={removeFromWatchlist}
                  onSelectStock={fetchStockChartData}
                />
              ))}
          </div>
        </div>
        
        {/* Market Overview Section - Can be expanded in future iterations */}
        <div className="py-4 text-center text-muted-foreground text-sm">
          <p>Market data is simulated for demonstration purposes.</p>
          <p>© 2025 MarketWhisper - Stock Prediction Platform</p>
        </div>
      </main>
    </div>
  );
};

export default Index;
