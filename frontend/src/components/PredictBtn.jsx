import React from "react";
import "./PredictBtn.css";
import { toast } from "react-toastify";
import axios from "axios";

const PredictBtn = () => {
  const handleUpload = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/test");
      toast.success(res.data);
    } catch (err) {
      toast.error("Response failed. Please try again.");
    }

    // await axios.post("http://localhost:8080/api/predict").then(
    //   (response) => {
    //     toast.success(response.data);
    //   },
    //   (err) => {
    //     toast.error(err);
    //   }
    // );
  };

  return (
    <div className="btn-container">
      <button className="btn" onClick={handleUpload}>
        Predict
      </button>
    </div>
  );
};

export default PredictBtn;
