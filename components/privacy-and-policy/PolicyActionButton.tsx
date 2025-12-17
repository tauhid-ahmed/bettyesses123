const PolicyActionButton = () => {
  return (
    <div className="flex gap-3">
      <button className="px-6 py-3 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
        Make Changes
      </button>
      <button className="px-6 py-3 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition-colors">
        Delete
      </button>
    </div>
  );
};

export default PolicyActionButton;
