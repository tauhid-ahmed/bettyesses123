import BookFormProvider from "@/features/books/context/CreateBookContext";

export default function AdminBookPage({ children }: React.PropsWithChildren) {
  return <BookFormProvider>{children}</BookFormProvider>;
}
