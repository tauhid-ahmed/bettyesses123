"use client";

import { useBookForm } from "../context/CreateBookContext";

export default function BookCreationWelcome() {
  const { state, dispatch } = useBookForm();
  return (
    <div>
      BookCreationWelcome{" "}
      <button onClick={() => dispatch({ type: "NEXT_STEP" })}>Next</button>
    </div>
  );
}
