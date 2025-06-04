import { IRefActions } from "@/@types";
import { Alert } from "@/components/custom_components/alert";
import { JSX, Ref } from "react";

export function useAlert() {
  function constructAlert(
    ref: Ref<IRefActions>,
    title: string,
    id: string,
    description: string,
    handler: () => void
  ): JSX.Element {
    return <Alert ref={ref} {...{ title, description, handler, id }} />;
  }

  return { constructAlert };
}
