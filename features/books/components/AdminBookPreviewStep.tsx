import { useBookForm } from "../context/CreateBookContext";

export default function BookPreviewStep() {
  const { state, dispatch, canGoPrev } = useBookForm();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Book Preview</h2>
      <div className="bg-gray-50 p-6 rounded-lg space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-2">Child Information</h3>
          <p>
            <strong>Name:</strong> {state.childDetails.name || "Not set"}
          </p>
          <p>
            <strong>Age:</strong> {state.childDetails.age}
          </p>
          <p>
            <strong>Gender:</strong> {state.childDetails.gender}
          </p>
          <p>
            <strong>Language:</strong> {state.childDetails.language}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Story Details</h3>
          <p>
            <strong>Idea:</strong> {state.storyIdea.idea || "Not set"}
          </p>
          <p>
            <strong>Setting:</strong> {state.storyIdea.setting || "Not set"}
          </p>
          <p>
            <strong>Characters:</strong>{" "}
            {state.storyIdea.characters.map((c) => c.name).join(", ") || "None"}
          </p>
          {state.storyIdea.moralLesson && (
            <p>
              <strong>Moral:</strong> {state.storyIdea.moralLesson}
            </p>
          )}
        </div>

        {state.childDetails.image && (
          <div>
            <h3 className="font-semibold text-lg mb-2">Child's Photo</h3>
            <img
              src={state.childDetails.image}
              alt="Child"
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-6">
        {canGoPrev && (
          <button
            onClick={() => dispatch({ type: "PREV_STEP" })}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
          >
            Previous
          </button>
        )}
        <button
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
