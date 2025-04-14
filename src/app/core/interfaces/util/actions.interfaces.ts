export interface ActionButton {
  label?: string;
  icon?: string;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'danger';
  visible?: boolean;
  variant?: 'outlined' | 'text';
  width?: string;
  disabled?: boolean;
  loading?: boolean;
  callback: (row: any) => void;
}
