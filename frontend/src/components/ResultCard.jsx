import { motion } from "framer-motion";

const ResultCard = ({ result }) => {
  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg p-6 mt-8 border border-gray-100"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Prediction Result
      </h2>

      <div className="flex items-start space-x-5">
        <motion.img
          src={result.imagePreview}
          alt="Uploaded"
          className="w-28 h-28 object-cover rounded-xl border shadow-sm"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        <div className="flex-1">
          <p className="text-xl text-emerald-700 font-bold">
            {result.equipment}
          </p>
          <p className="text-gray-600 mt-1">
            Brand:{" "}
            <span className="font-medium">
              {result.brand || "Not detected"}
            </span>
          </p>

          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-1">Confidence Score</p>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-emerald-500 h-3 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${result.confidence}%` }}
                transition={{ duration: 1 }}
              />
            </div>
            <p className="text-xs text-right text-gray-500 mt-1">
              {result.confidence}%
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
