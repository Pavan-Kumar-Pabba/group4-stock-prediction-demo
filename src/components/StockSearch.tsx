
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StockData } from "../types/stock";

interface StockSearchProps {
  stocks: StockData[];
  onSelectStock: (symbol: string) => void;
}

export function StockSearch({ stocks, onSelectStock }: StockSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const filteredStocks = stocks.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) || 
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelect = (symbol: string) => {
    onSelectStock(symbol);
    setSearchTerm("");
    setIsDropdownOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for stocks..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsDropdownOpen(e.target.value.length > 0);
            }}
            onFocus={() => setIsDropdownOpen(searchTerm.length > 0)}
            className="pl-10 shadow-sm"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search size={16} />
          </div>
        </div>
        <Button type="submit">Search</Button>
      </div>
      
      {isDropdownOpen && filteredStocks.length > 0 && (
        <div className="absolute mt-1 w-full rounded-md bg-popover shadow-lg z-50 max-h-60 overflow-auto">
          <ul className="py-1">
            {filteredStocks.map((stock) => (
              <li 
                key={stock.symbol}
                onClick={() => handleSelect(stock.symbol)}
                className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center">
                  <span className="font-medium">{stock.symbol}</span>
                  <span className="ml-2 text-muted-foreground text-sm">{stock.name}</span>
                </div>
                <span className={`${stock.change >= 0 ? 'text-market-up' : 'text-market-down'}`}>
                  ${stock.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default StockSearch;
