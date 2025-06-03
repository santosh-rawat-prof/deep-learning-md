import { useState } from "react";
import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PredictBtn from "./components/PredictBtn";

function App() {
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    const imagePreview = URL.createObjectURL(file);

    console.log(formData);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/predict",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(res);

      setResult({ ...res.data, imagePreview });
    } catch (err) {
      toast.error(`Prediction failed. Please try again. ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Medical Equipment Identifier
        </h1>
        <UploadCard onUpload={handleUpload} />
        <PredictBtn />
        {result && <ResultCard result={result} />}
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
