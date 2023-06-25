import Button from "@mui/material/Button";

import { blue } from "@mui/material/colors";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

interface UploadFileDropProps {
  onChangeFile: any;
}
function UploadFileDrop(props: UploadFileDropProps) {
  const { onChangeFile } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragEntered, setDragEntered] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDragEntered(false);
    let file: any = null;

    if (e.dataTransfer.items) {
      [...e.dataTransfer.items].forEach((item, i) => {
        if (item.kind === "file" && i === 0) {
          if (file) {
            file = item.getAsFile();
            setFileName(file?.name);
          }
        }
      });
    } else {
      [...e.dataTransfer.files].forEach((fileItem, i) => {
        if (i === 0) {
          if (file) {
            file = fileItem;
            setFileName(file?.name);
          }
        }
      });
    }

    onChangeFile(file);
  };
  const handleDragEnter = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEntered(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEntered(false);
  };
  const handleClick = () => {
    fileInputRef.current?.click();
    setDragEntered(false);
  };

  const handleChange = (e: ChangeEvent<any>) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file?.name);
      onChangeFile(file);
    }
  };

  return (
    <Button
      variant="outlined"
      sx={{
        borderStyle: "dashed",
        height: 300,
        ...(dragEntered ? { borderStyle: "solid", bgcolor: blue[50] } : {}),
      }}
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      fullWidth
    >
      <input type="file" hidden ref={fileInputRef} onChange={handleChange} />
      {dragEntered ? "فایل را رها کنید" : "آپلود رسانه"}
      <br />
      {fileName}
    </Button>
  );
}

export default UploadFileDrop;
