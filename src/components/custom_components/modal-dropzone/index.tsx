import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { CloudUploadIcon } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { toast } from "sonner";

export const ModalDropzone = ({
  handleFile,
  open,
  setOpen,
}: {
  handleFile: (input: File) => void;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    getRootProps,
    getInputProps,
    isDragReject,
    isDragActive,
    isDragAccept,
  } = useDropzone({
    accept: {
      "image/*": ["./jpeg", "./png", "./gif", "./jpg"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setSelectedFile(acceptedFiles[0]);
      }
    },
  });

  useEffect(() => {
    if (selectedFile) {
      return () => {
        setSelectedFile(null);
      };
    }
  }, [open, selectedFile]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent className="[&>button]:hidden">
        <input
          {...getInputProps()}
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setSelectedFile(e.target.files[0]);
            }
          }}
        />
        {!selectedFile ? (
          <div
            {...getRootProps()}
            className={`
            w-full h-[300px] text-center flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded p-4 cursor-pointer
            transition-all duration-300 ease-in-out
            hover:bg-gray-50
            dark:hover:bg-gray-700
            ${isDragActive ? "border-blue-500 cursor-copy" : ""}
            ${isDragReject ? "border-red-500 cursor-not-allowed" : ""}
          `}
          >
            {isDragAccept ? (
              <h6>Solte o arquivo aqui...</h6>
            ) : isDragReject ? (
              <h6>Tipo de arquivo não suportado</h6>
            ) : (
              <h6>Arraste e solte uma imagem aqui ou clique para selecionar</h6>
            )}
            <CloudUploadIcon style={{ fontSize: 100, marginBottom: 2 }} />

            <Button
              variant="ghost"
              className="cursor-pointer"
              style={{
                marginTop: 2,
                visibility: isDragActive ? "hidden" : "visible",
              }}
            >
              Selecionar arquivo
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Image
              src={URL.createObjectURL(selectedFile)}
              alt={selectedFile.name}
              width={200}
              height={200}
              className="max-h-[200px] object-contain rounded"
              style={{ width: "auto", height: "auto" }}
            />
            <p className="text-sm text-gray-500">
              {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
            </p>
          </div>
        )}
        <DialogFooter>
          <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => {
              if (!selectedFile) {
                return toast.error("Nenhum arquivo selecionado");
              }
              handleFile(selectedFile as File);
            }}
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
