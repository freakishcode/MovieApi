import { useRef, useState } from "react";
import "./UploadFiles.css";
import axios from "axios";

function UploadFiles() {
  const inputRef = useRef();

  // state variables for tracking file-related information
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select"); // select | uploading | done

  //   HANDLE FILE CHANGE EVENT
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // function to trigger File input dialog
  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", selectedFile);

      await axios.post("http://localhost:8000/api/upload", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setUploadStatus("done");
    } catch {
      setUploadStatus("select");
    }
  };

  return (
    <div className='container-upload'>
      {/* fILE INPUT ELEMENT WITH A REFERENCE */}
      <input
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      {/* BUTTON TO TRIGGER THE FILE INPUT UPLOAD */}
      {!selectedFile && (
        <button className='upload-btn' onClick={onChooseFile}>
          <span>icons</span> upload File
        </button>
      )}

      {/* DISPLAY FILE INFORMATION AND PROGRESS WHEN A FILE IS SELECTED */}
      {selectedFile && (
        <>
          <div className='file-card'>
            <span className='material-symbols-outlined icon'>Description</span>

            <div className='file-info'>
              <div style={{ flex: 1 }}>
                <h6>{selectedFile?.name}</h6>

                <div className='progress-bg'>
                  <div className='progress' style={{ width: `${progress}%` }} />
                </div>
              </div>

              {uploadStatus === "select" ? (
                <button className=' close-icon' onClick={clearFileInput}>
                  cancel
                </button>
              ) : (
                <div className='check-circle'>
                  {uploadStatus === "uploading" ? (
                    `${progress}%`
                  ) : uploadStatus === "done" ? (
                    <span
                      className='material-symbols-outlined'
                      style={{ fontSize: "20px" }}
                    >
                      check
                    </span>
                  ) : null}
                </div>
              )}
            </div>
          </div>
          <button className='upload-btn' onClick={handleUpload}>
            {uploadStatus === "select" || uploadStatus === "uploading"
              ? "Upload"
              : "Done"}
          </button>
        </>
      )}
    </div>
  );
}

export default UploadFiles;
