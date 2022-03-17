import React from "react";
import Select, { OptionsOrGroups } from "react-select";
import Option from "../../model/Option";

interface Props {
  tags: Array<Option>;
  selectTagsHandler: (tags: Array<string>) => void;
}

export default function CustomSelect({ tags, selectTagsHandler }: Props) {
  return (
    <Select
      closeMenuOnSelect={false}
      defaultValue={[]}
      onChange={(values) => {
        selectTagsHandler(values.map((elem) => elem.value));
      }}
      isMulti
      options={tags as OptionsOrGroups<Option, any>}
    />
  );
}
