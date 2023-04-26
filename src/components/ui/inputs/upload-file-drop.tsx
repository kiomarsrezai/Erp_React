import Button from "@mui/material/Button";

import { blue } from "@mui/material/colors";
import { useRef, useState } from "react";

function UploadFileDrop() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragEntered, setDragEntered] = useState(false);

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEntered(false);
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
      <input type="file" hidden ref={fileInputRef} />
      {dragEntered ? "فایل را رها کنید" : "آپلود رسانه"}
    </Button>
  );
}

export default UploadFileDrop;
