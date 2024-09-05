import { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    branch: '',
    year: '',
    subject: '',
  });

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchProvider, SearchContext };