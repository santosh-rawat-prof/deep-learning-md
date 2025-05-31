const ResultCard = ({ result }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 mt-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Prediction Result
      </h2>
      <div className="flex items-center space-x-4">
        <img
          src={result.imagePreview}
          alt="Uploaded"
          className="w-20 h-20 object-cover rounded-md border"
        />
        <div className="flex-1">
          <p className="text-xl font-bold text-blue-700">{result.equipment}</p>
          <p className="text-sm text-gray-600">
            Brand: <span className="font-medium">{result.brand || "N/A"}</span>
          </p>

          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{ width: `${result.confidence}%` }}
            ></div>
          </div>
          <p className="text-right text-xs text-gray-500 mt-1">
            {result.confidence}% confidence
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
