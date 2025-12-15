type Props = {
  title: string;
  description: string;
  image: string;
  name: string;
  rating: number;
};

export default function Card({
  title,
  description,
  image,
  name,
  rating,
}: Props) {
  return (
    <div className="w-96 m-1 rounded-4xl border border-transparent bg-linear-to-r primary-gradient bg-clip-border">
      <div className="rounded-4xl bg-gray-100 p-6 md:p-8">{title}</div>
    </div>
  );
}
