export interface IAlertProps {
  title: string;
  description: string;
  handler: (id: string) => void;
}
