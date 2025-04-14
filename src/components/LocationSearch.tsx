
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/sonner';
import { searchLocation } from '../api/weatherApi';

interface LocationSearchProps {
  onLocationSelect: (lat: number, lon: number, name: string) => void;
  onMyLocationClick: () => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
  onLocationSelect, 
  onMyLocationClick 
}) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error("Please enter a location");
      return;
    }
    
    setIsSearching(true);
    
    try {
      const location = await searchLocation(query);
      onLocationSelect(location.lat, location.lon, location.name);
      setQuery('');
    } catch (error) {
      toast.error("Location not found. Please try again.");
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="pl-9 pr-4 h-10"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={isSearching} className="bg-primary">
          {isSearching ? 'Searching...' : 'Search'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={onMyLocationClick}
          className="flex items-center gap-1"
        >
          <MapPin size={16} />
        </Button>
      </form>
    </div>
  );
};

export default LocationSearch;
