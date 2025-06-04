import { useState } from "react";
import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import ThemeToggle from "./components/ThemeToggle";
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
    setResult(null);

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-4 font-sans transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header with title and toggle aligned */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Medical Equipment Identifier
          </h1>
          <ThemeToggle />
        </div>

        <UploadCard onUpload={handleUpload} />

        {loading && selectedImage && (
          <div className="mt-6 flex flex-col items-center">
            <p className="text-gray-700 dark:text-gray-200 mb-2 font-medium animate-pulse">
              Processing image...
            </p>
            <img
              src={selectedImage}
              alt="Processing"
              className="w-36 h-36 object-cover rounded-lg shadow-md animate-pulse border border-gray-300 dark:border-gray-600"
            />
          </div>
        )}

        {!loading && result && <ResultCard result={result} />}
      </div>
      <ToastContainer
        position="bottom-center"
        theme={localStorage.getItem("theme") || "light"}
      />
    </div>
  );
}

export default App;
