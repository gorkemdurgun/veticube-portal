import { Button, Input } from "antd";
import { memo, useState } from "react";
import { PiMagnifyingGlass as SearchIcon } from "react-icons/pi";

type Props = {
  onSearchDone: (list: string[]) => void;
};

const SearchPatientInput = ({ onSearchDone }: Props) => {
  const [activeValue, setActiveValue] = useState<string | undefined>(undefined);

  const onSearch = (searchText: string) => {
    if (searchText.length < 2) return;

    fetch(`https://api.github.com/search/users?q=${searchText}`)
      .then((response) => response.json())
      .then((body) => {
        console.log(body);
        onSearchDone(body.items.map((item: any) => item.login));
      });
  };

  return (
    <Input.Search
      enterButton
      size="large"
      placeholder="Search patient"
      loading={undefined}
      value={activeValue}
      onChange={(e) => setActiveValue(e.target.value)}
      onSearch={onSearch}
    />
  );
};

export default memo(SearchPatientInput);