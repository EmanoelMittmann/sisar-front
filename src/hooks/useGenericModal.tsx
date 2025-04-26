import { IRefActions } from "@/@types";
import { GenericModal } from "@/components/custom_components/generic-modal";
import { JSX, Ref } from "react";

export function useGenericModal() {
  function constructModal(
    ref: Ref<IRefActions>,
    title: string,
    render: React.ReactNode
  ): JSX.Element {
    return (
      <GenericModal
        ref={ref}
        title={title}
        render={render}
        handler={() => {}}
      />
    );
  }

  return { constructModal };
}
