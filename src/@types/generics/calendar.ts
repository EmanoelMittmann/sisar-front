import { Temporal } from "@js-temporal/polyfill";

export interface ISchedulerProps {
  onClick: (args: Temporal.PlainDateTime) => void;
  // onEventClick: (args: unknown) => void;
}
