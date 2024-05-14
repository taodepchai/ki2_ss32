import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

interface SearchInputProps {
  onSearch: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const debouncedSearch = useCallback(debounce(onSearch, 300), []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    debouncedSearch(newTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm theo tên hoặc email"
        value={term}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchInput;
