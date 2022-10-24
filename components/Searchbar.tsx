import React from "react";

const Searchbar = ({
  inputRef,
  setStartIndex,
  setIsLoading,
  handleSearch,
}: {
  inputRef: React.LegacyRef<HTMLInputElement> | undefined;
  setStartIndex: any;
  setIsLoading: any;
  handleSearch: any;
}) => {
  return (
    <input
      ref={inputRef}
      type="search"
      onChange={e => {
        setStartIndex(0);
        setIsLoading(true);
        handleSearch(e.target.value);
      }}
      placeholder="Search Freelancers (Specialties, Skills...)"
      className="w-full h-12 font-bold text-center transition-all rounded-lg outline-none"
    />
  );
};

export default Searchbar;
