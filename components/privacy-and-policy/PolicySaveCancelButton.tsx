const PolicySaveCancelButton = () => {
  return (
    <div className="flex justify-center gap-4 pt-4">
      <button className="px-12 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50  hover:border hover:border-black transition-colors">
        Cancel
      </button>
      <button className="px-12 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors">
        Save
      </button>
    </div>
  );
};

export default PolicySaveCancelButton;
