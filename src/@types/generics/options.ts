export interface IOption {
  label: string;
  value: string;
}

export type IOptions = IOption[];

export interface PopoverMenu {
  label: string;
  onClick: () => void;
}

export type PopoverMenuProps = { options: PopoverMenu[] };
