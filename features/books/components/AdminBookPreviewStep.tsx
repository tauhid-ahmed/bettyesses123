import Section from "@/components/Section";
import { useBookForm } from "../context/CreateBookContext";
import AdminBookCreatePreview from "./AdminBookCreatePreview";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";

export default function BookPreviewStep() {
  const { state, dispatch, canGoPrev } = useBookForm();

  return (
    <>
      <AdminBookCreatePreview />
      <Container size="xs">
        <div className="flex gap-2 justify-center items-center mt-6 sm:*:flex-1">
          {canGoPrev && (
            <Button
              onClick={() => dispatch({ type: "PREV_STEP" })}
              variant="outline"
            >
              Previous
            </Button>
          )}
          <Button
            onClick={() => dispatch({ type: "NEXT_STEP" })}
            className="primary-gradient"
          >
            Continue
          </Button>
        </div>
      </Container>
    </>
  );
}
