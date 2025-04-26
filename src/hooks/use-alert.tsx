import { IRefActions } from "@/@types";
import { Alert } from "@/components/custom_components/alert";
import { JSX, Ref } from "react";

export function useAlert() {
  function constructAlert(
    ref: Ref<IRefActions>,
    title: string,
    description: string,
    handler: (id: string) => void
  ): JSX.Element {
    return <Alert ref={ref} {...{ title, description, handler }} />;
  }

  return { constructAlert };
}
