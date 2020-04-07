import * as React from 'react';
import { FunctionComponent } from 'react';
import { ElementType, useState } from 'react';
import styled from '@emotion/styled';
import { IBlockOption } from '../blockData';

const SelectHeight = 28;
const SelectWidth = 112;

interface IGroupedMenu {
  options: IBlockOption[];
  selectedBlockType: string;
  onChange: (blockType: string) => void;
}

const Grouped: FunctionComponent<IGroupedMenu> = ({
  options,
  selectedBlockType,
  onChange,
}) => {
  const [Select, setSelect] = useState<ElementType | undefined>(undefined);
  import('nib-ui-select').then((args) => {
    const { Select: NibUISelect } = args.default;
    setSelect(NibUISelect);
  });

  let selectedOption;
  if (selectedBlockType) {
    selectedOption = options.find(
      (opt) => opt.value.blockType === selectedBlockType
    );
  } else {
    selectedOption = { value: undefined, label: 'Other' };
  }
  if (!Select) return <Placeholder />;
  return (
    <Select
      height={SelectHeight}
      width={SelectWidth}
      onChange={(option: IBlockOption) => onChange(option.value.blockType)}
      options={options}
      selectedOption={selectedOption}
      isSearchable={false}
    />
  );
};

const Placeholder = styled.div`
  height: ${SelectHeight}px;
  width: ${SelectWidth}px;
`;

export default Grouped;
