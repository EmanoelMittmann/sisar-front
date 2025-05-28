export interface IAlertProps {
  id: string;
  title: string;
  description: string;
  handler: (id: string) => void;
}
