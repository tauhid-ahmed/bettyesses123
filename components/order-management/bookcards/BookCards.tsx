import bookImg from "@/images/book-image/book-image.png";
import Image from "next/image";


export type BookOrder = {
  id: number;
  image: string;
  count: number;
  title: string;
  name: string;
  age: number;
  orderDate: string;
  status: string;
  price: string;
};

type BookCardsProps = {
  setSelectedBook: (book: BookOrder) => void;
};


const BookCards = ({ setSelectedBook }: BookCardsProps) => {
  const orders: BookOrder[] = [
    {
      id: 1,
      image: "/book-cover.jpg",
      count: 2,
      title: "The adventure of Rakib to the amazon jungle",
      name: "Rakib",
      age: 11,
      orderDate: "10-12-2025",
      status: "Processing",
      price: "€ 30.00",
    },
    {
      id: 2,
      image: "/book-cover.jpg",
      count: 3,
      title: "The adventure of Rakib to the amazon jungle",
      name: "Rakib",
      age: 11,
      orderDate: "10-12-2025",
      status: "Processing",
      price: "€ 30.00",
    },
  ];

  return (
    <div className="border-t-2 border-[#99A6B8] pt-10 space-y-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-[#99A6B8] rounded-lg p-4 cursor-pointer"
          onClick={() => setSelectedBook(order)}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <div className="relative shrink-0 w-48 h-56 bg-gray-300 rounded-lg overflow-hidden">
              <Image
                src={bookImg}
                alt="Book Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute bg-black/40 inset-0 flex items-center justify-center">
                <span className="text-[#FFFFFF] text-5xl font-bold">
                  +{order.count}
                </span>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-[#2D2D2D] text-2xl font-medium mb-3">
                {order.title}
              </h3>

              <div className="flex flex-col">
                <div className="flex gap-1 pb-1">
                  <span className="font-medium text-[#636F85]">Name:</span>
                  <p>{order.name}</p>

                  <span className="font-medium text-[#636F85] ml-3">Age:</span>
                  <p>{order.age}</p>
                </div>

                <div className="flex gap-1 pb-1">
                  <span className="font-medium text-[#636F85]">
                    Order Date:
                  </span>
                  <p>{order.orderDate}</p>
                </div>

                <div className="flex gap-1 pb-1">
                  <span className="font-medium text-[#636F85]">Status:</span>
                  <p>{order.status}</p>
                </div>

                <p className="text-gray-900 font-semibold mt-2">
                  {order.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookCards;
