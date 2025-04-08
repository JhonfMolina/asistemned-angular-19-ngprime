export interface ActionButton {
  label?: string;
  icon?: string;
  color?: string;
  visible?: boolean;
  width?: string;
  disabled?: boolean;
  loading?: boolean;
  callback: (row: any) => void;
}
