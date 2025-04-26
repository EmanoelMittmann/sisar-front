import React from "react";

export interface IRefActions {
  handleOpen: () => void;
  handleClose: () => void;
}

export interface IGenericModalProps {
  render: React.ReactNode;
  title: string;
  handler: () => void;
}
