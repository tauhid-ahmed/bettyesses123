export default function Banner({ children }: React.PropsWithChildren) {
  return (
    <div className="relative rounded overflow-hidden z-10 m-10">
      <div className="primary-gradient opacity-50 absolute inset-0 -z-10" />
      <div className="p-8 lg:p-10 min-h-32 md:h-60 grid place-items-center lg:h-80">
        {children}
      </div>
    </div>
  );
}
