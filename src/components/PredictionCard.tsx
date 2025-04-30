
import { StockPrediction } from "../types/stock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown } from "lucide-react";
import { getPredictionBadgeClass } from "../utils/predictStock";

interface PredictionCardProps {
  prediction: StockPrediction;
  stockPrice: number;
}

export function PredictionCard({ prediction, stockPrice }: PredictionCardProps) {
  const { symbol, recommendation, confidenceScore, predictedPrice, predictedChange, timeframe } = prediction;
  
  const timeframeLabel = {
    "1d": "24 hours",
    "1w": "1 week",
    "1m": "1 month",
    "3m": "3 months"
  }[timeframe];
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Prediction ({symbol})</span>
          <span className={getPredictionBadgeClass(recommendation)}>
            {recommendation.toUpperCase()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Confidence Score</span>
              <span className="text-sm">{confidenceScore}%</span>
            </div>
            <Progress value={confidenceScore} className="h-2" />
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm text-muted-foreground">Current Price</div>
              <div className="font-medium">${stockPrice.toFixed(2)}</div>
            </div>
            <div className="text-xl font-bold">→</div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Target Price</div>
              <div className="font-medium">${predictedPrice.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            {predictedChange >= 0 ? (
              <TrendingUp className="h-4 w-4 mr-2 text-market-up" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-2 text-market-down" />
            )}
            <span className="text-sm">
              Predicted change of <span className={predictedChange >= 0 ? 'text-market-up font-medium' : 'text-market-down font-medium'}>
                {predictedChange > 0 ? '+' : ''}{predictedChange.toFixed(2)}%
              </span> in {timeframeLabel}
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground mt-2">
            This prediction is based on historical data, market sentiment, and technical analysis. Please conduct your own research before making investment decisions.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PredictionCard;
