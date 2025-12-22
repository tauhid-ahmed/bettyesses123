import { useForm } from "react-hook-form";
import { useBookForm } from "../context/CreateBookContext";
import { Character, StoryIdea, storyIdeaSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function StoryIdeaStep() {
  const { state, dispatch, canGoPrev } = useBookForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StoryIdea>({
    resolver: zodResolver(storyIdeaSchema),
    defaultValues: state.storyIdea,
  });

  const onSubmit = (data: StoryIdea) => {
    dispatch({ type: "UPDATE_STORY_IDEA", payload: data });
    dispatch({ type: "NEXT_STEP" });
  };

  const addCharacter = () => {
    const newChar: Character = {
      id: Date.now().toString(),
      name: "",
      description: "",
    };
    dispatch({ type: "ADD_CHARACTER", payload: newChar });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Story Idea</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Story Idea *</label>
          <textarea
            {...register("idea")}
            rows={4}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your story idea..."
          />
          {errors.idea && (
            <p className="text-red-500 text-sm mt-1">{errors.idea.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Characters *</label>
          {state.storyIdea.characters.map((char, idx) => (
            <div key={char.id} className="flex gap-2 mb-2">
              <input
                value={char.name}
                onChange={(e) => {
                  const updated = [...state.storyIdea.characters];
                  updated[idx] = { ...char, name: e.target.value };
                  dispatch({
                    type: "UPDATE_STORY_IDEA",
                    payload: { characters: updated },
                  });
                }}
                className="flex-1 px-3 py-2 border rounded-lg"
                placeholder="Character name"
              />
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: "REMOVE_CHARACTER", payload: char.id })
                }
                className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addCharacter}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add Character
          </button>
          {errors.characters && (
            <p className="text-red-500 text-sm mt-1">
              {errors.characters.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Setting *</label>
          <input
            {...register("setting")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Where does the story take place?"
          />
          {errors.setting && (
            <p className="text-red-500 text-sm mt-1">
              {errors.setting.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Moral Lesson (Optional)
          </label>
          <input
            {...register("moralLesson")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="What lesson should the story teach?"
          />
        </div>

        <div className="flex gap-2">
          {canGoPrev && (
            <button
              type="button"
              onClick={() => dispatch({ type: "PREV_STEP" })}
              className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
            >
              Previous
            </button>
          )}
          <button
            type="submit"
            className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );
}
