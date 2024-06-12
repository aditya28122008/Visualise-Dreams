/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import loaderContext from "../context/loadingBar/loderContext";
import axios from "axios";
import vars from '../vars'

const Test = () => {
  const lodCon = useContext(loaderContext);
  const { setProgress } = lodCon;
  const [file, setFile] = useState(null);
    const [uploadPercentage, setUploadPercentage] = useState(0);
    const [isUploaded, setIsUploaded] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
        setIsUploaded(false); // Reset the upload state if a new file is selected
    };

    const onFileUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${vars.host}/test-api/upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percentCompleted = Math.round((loaded * 100) / total);
                    setProgress(percentCompleted)
                },
            });
            console.log(response.data);
            setUploadPercentage(0);
            setIsUploaded(true);
            setAlertMessage('File uploaded successfully!');
        } catch (error) {
            console.error(error);
            setUploadPercentage(0); // Reset the progress bar on error
            setAlertMessage('File upload failed. Please try again.');
        }
    };
  useEffect(() => {
    setProgress(100);
  }, []);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">File Upload with Progress Bar</h2>
            <input type="file" onChange={onFileChange} className="mb-4 p-2 border border-gray-300 rounded" />
            {!isUploaded && (
                <button
                    onClick={onFileUpload}
                    className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    disabled={!file}
                >
                    Upload
                </button>
            )}
            {uploadPercentage > 0 && (
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                    <div
                        className="bg-green-500 h-4 rounded-full"
                        style={{ width: `${uploadPercentage}%` }}
                    >
                        <span className="text-white text-xs font-medium">
                            {uploadPercentage}%
                        </span>
                    </div>
                </div>
            )}
            {alertMessage && (
                <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                    {alertMessage}
                </div>
            )}
        </div>
    </>
  );
};

export default Test;
