export interface AccessItemShape {
  name: string | number;
  label: string;
  value?: AccessItemShape[];
  isField?: boolean;
}
