import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const UploadCard = ({ onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/jpeg": [".jpg"] },
    multiple: false,
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        toast.error("❌ Only JPG files are accepted.");
      } else {
        onUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      {...getRootProps()}
      className="flex items-center justify-center w-full"
    >
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-2xl cursor-pointer bg-gradient-to-br from-emerald-50 to-white hover:from-emerald-100 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-10 h-10 mb-4 text-emerald-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-md text-gray-700 font-semibold">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">Only JPG files allowed</p>
        </div>
        <input
          {...getInputProps()}
          id="dropzone-file"
          type="file"
          className="hidden"
        />
      </label>
    </motion.div>
  );
};

export default UploadCard;
