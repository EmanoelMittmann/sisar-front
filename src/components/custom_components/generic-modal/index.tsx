"use client";
import { IGenericModalProps, IRefActions } from "@/@types/generics/ref_actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { forwardRef, useImperativeHandle, useState } from "react";

export const GenericModal = forwardRef<IRefActions, IGenericModalProps>(
  ({ title, render, handler }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    //TODO add arg param for reset form
    function handleClose() {
      setIsOpen(false);
    }

    useImperativeHandle(
      ref,
      () => ({
        handleOpen: () => {
          setIsOpen(true);
        },
        handleClose,
      }),
      []
    );

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>{title}</DialogHeader>
          <div>{render}</div>
          <DialogFooter>
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Cancelar
            </Button>
            <Button className="cursor-pointer" onClick={() => handler()}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

GenericModal.displayName = "GenericModal";
