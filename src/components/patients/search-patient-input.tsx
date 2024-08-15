import { Input } from "antd";
import { memo, useState } from "react";

type Props = {
  onSearchDone: (list: string[]) => void;
};

export const Component = ({ onSearchDone }: Props) => {
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
      size="large"
      placeholder="Search patient"
      value={activeValue}
      onChange={(e) => setActiveValue(e.target.value)}
      enterButton
      onSearch={onSearch}
    />
  );
};

export const SearchPatientInput = memo(Component);
