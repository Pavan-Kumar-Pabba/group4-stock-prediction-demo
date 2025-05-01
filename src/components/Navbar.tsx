
import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

export function Navbar({ toggleTheme, isDarkMode }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b bg-background sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="font-bold text-xl flex items-center">
            <span className="text-primary">Grow</span>
            <span className="text-accent">Up</span>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Button variant="ghost" className="font-medium">Dashboard</Button>
          <Button variant="ghost" className="font-medium">Analytics</Button>
          <Button variant="ghost" className="font-medium">Watchlist</Button>
          <Button variant="ghost" className="font-medium">News</Button>
          <Button variant="ghost" className="font-medium">Settings</Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute w-full bg-background border-b z-40">
          <div className="px-4 py-2 space-y-2">
            <Button variant="ghost" className="w-full justify-start">Dashboard</Button>
            <Button variant="ghost" className="w-full justify-start">Analytics</Button>
            <Button variant="ghost" className="w-full justify-start">Watchlist</Button>
            <Button variant="ghost" className="w-full justify-start">News</Button>
            <Button variant="ghost" className="w-full justify-start">Settings</Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={toggleTheme}
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
              <span className="ml-2">{isDarkMode ? <Sun size={16} /> : <Moon size={16} />}</span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
