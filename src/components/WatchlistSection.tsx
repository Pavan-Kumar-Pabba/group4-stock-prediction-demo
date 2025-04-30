
import { StockData, StockPrediction } from "../types/stock";
import StockCard from "./StockCard";

interface WatchlistSectionProps {
  watchlistStocks: StockData[];
  predictions: StockPrediction[];
  isInWatchlist: (symbol: string) => boolean;
  onAddToWatchlist: (symbol: string) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
  onSelectStock: (symbol: string) => void;
}

export function WatchlistSection({
  watchlistStocks,
  predictions,
  isInWatchlist,
  onAddToWatchlist,
  onRemoveFromWatchlist,
  onSelectStock
}: WatchlistSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Your Watchlist</h2>
      </div>
      
      {watchlistStocks.length === 0 ? (
        <div className="text-center py-8 bg-muted/50 rounded-lg border border-dashed">
          <p className="text-muted-foreground">Your watchlist is empty. Add some stocks to track them.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {watchlistStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              prediction={predictions.find(p => p.symbol === stock.symbol)}
              isInWatchlist={isInWatchlist(stock.symbol)}
              onAddToWatchlist={onAddToWatchlist}
              onRemoveFromWatchlist={onRemoveFromWatchlist}
              onSelectStock={onSelectStock}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistSection;
