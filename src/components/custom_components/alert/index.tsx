import { IAlertProps, IRefActions } from "@/@types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { forwardRef, useImperativeHandle, useState } from "react";

export const Alert = forwardRef<IRefActions, IAlertProps>(
  ({ description, title, handler }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    function handleClose() {
      setIsOpen(false);
    }

    useImperativeHandle(
      ref,
      () => ({
        handleOpen: () => setIsOpen(true),
        handleClose,
      }),
      []
    );

    return (
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handler()}>
              Salvar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

Alert.displayName = "Alert";
