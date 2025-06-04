import { useState } from "react";
import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const imagePreview = URL.createObjectURL(file);

    setSelectedImage(imagePreview);
    setLoading(true);
    setResult(null); // Clear previous result

    try {
      const res = await axios.post(
        "http://localhost:8080/api/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult({ ...res.data, imagePreview });
    } catch (err) {
      toast.error(`Prediction failed. Please try again. ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Medical Equipment Identifier
        </h1>

        <UploadCard onUpload={handleUpload} />

        {loading && selectedImage && (
          <div className="mt-6 flex flex-col items-center">
            <p className="text-gray-700 mb-2 font-medium animate-pulse">
              Processing image...
            </p>
            <img
              src={selectedImage}
              alt="Processing"
              className="w-36 h-36 object-cover rounded-lg shadow-md animate-pulse border border-gray-300"
            />
          </div>
        )}

        {!loading && result && <ResultCard result={result} />}
      </div>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
