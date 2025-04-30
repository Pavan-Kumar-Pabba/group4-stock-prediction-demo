
import { StockData, StockPrediction } from "../types/stock";
import { Star, StarOff, TrendingUp, TrendingDown, ArrowUp, ArrowDown } from "lucide-react";
import { getPredictionBadgeClass } from "../utils/predictStock";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface StockCardProps {
  stock: StockData;
  prediction?: StockPrediction;
  isInWatchlist: boolean;
  onAddToWatchlist: (symbol: string) => void;
  onRemoveFromWatchlist: (symbol: string) => void;
  onSelectStock: (symbol: string) => void;
}

export function StockCard({ 
  stock, 
  prediction, 
  isInWatchlist, 
  onAddToWatchlist, 
  onRemoveFromWatchlist,
  onSelectStock
}: StockCardProps) {
  const { symbol, name, price, change, changePercent } = stock;
  
  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist) {
      onRemoveFromWatchlist(symbol);
    } else {
      onAddToWatchlist(symbol);
    }
  };
  
  return (
    <Card 
      className="stock-card cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={() => onSelectStock(symbol)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{symbol}</h3>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleWatchlistToggle}
            className="mt-[-4px]"
          >
            {isInWatchlist ? (
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-5 w-5" />
            )}
          </Button>
        </div>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold">${price.toFixed(2)}</span>
            <div className={`flex items-center mt-1 ${change >= 0 ? 'text-market-up' : 'text-market-down'}`}>
              {change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              <span className="text-sm">
                {change.toFixed(2)} ({changePercent.toFixed(2)}%)
              </span>
            </div>
          </div>
          
          {prediction && (
            <div className="flex flex-col items-end">
              <span className={getPredictionBadgeClass(prediction.recommendation)}>
                {prediction.recommendation.toUpperCase()}
              </span>
              <div className="flex items-center mt-1 text-xs">
                {prediction.predictedChange >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-market-up" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-market-down" />
                )}
                <span>Potential: {prediction.predictedChange > 0 ? '+' : ''}{prediction.predictedChange.toFixed(2)}%</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {prediction && (
        <CardFooter className="px-4 py-2 bg-secondary/50 flex justify-between items-center">
          <span className="text-xs">
            Confidence: <span className="font-medium">{prediction.confidenceScore}%</span>
          </span>
          <span className="text-xs">
            Target: <span className="font-medium">${prediction.predictedPrice.toFixed(2)}</span>
          </span>
        </CardFooter>
      )}
    </Card>
  );
}

export default StockCard;
