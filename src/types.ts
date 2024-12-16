export interface Country {
    cca3: string; 
    name: {
      common: string; 
    };
    flags: {
      svg: string; 
    };
    latlng?: [number, number]; 
    languages: { [key: string]: string }; 
    currencies: { [key: string]: { name: string } }; 
    capital?: string; 
    independent: boolean; 
    population: number; 
    continents?: string;
    maps: { [key: string]: { googleMaps: string } }; 
  }