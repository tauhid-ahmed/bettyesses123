export default function Container({ children }: React.PropsWithChildren) {
  return <div className="max-w-7xl w-full mx-auto px-8">{children}</div>;
}
