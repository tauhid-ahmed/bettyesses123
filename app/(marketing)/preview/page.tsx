"use client";

import { useState, createContext, useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Global State Context
const BookContext = createContext();

const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within BookProvider");
  }
  return context;
};

// Book data
const bookPagesData = [
  {
    pageNumber: 1,
    title: "TWIRLS, WHIRLS AND ROLLS!",
    subtitle: "Twirls around in the sky...",
    bgColor: "from-cyan-400 to-blue-300",
    images: [
      {
        id: "p1-img1",
        url: "https://source.unsplash.com/800x600/?airplane,sky",
        alt: "Airplane flying in the sky",
      },
      {
        id: "p1-img2",
        url: "https://source.unsplash.com/800x600/?jet,clouds",
        alt: "Jet above clouds",
      },
      {
        id: "p1-img3",
        url: "https://source.unsplash.com/800x600/?aerobatic,plane",
        alt: "Aerobatic airplane",
      },
      {
        id: "p1-img4",
        url: "https://source.unsplash.com/800x600/?aircraft,blue-sky",
        alt: "Aircraft in blue sky",
      },
    ],
  },
  {
    pageNumber: 2,
    subtitle: "Hello and down again...",
    bgColor: "from-yellow-300 to-yellow-200",
    images: [
      {
        id: "p2-img1",
        url: "https://source.unsplash.com/800x600/?kids,blocks",
        alt: "Kids playing with blocks",
      },
      {
        id: "p2-img2",
        url: "https://source.unsplash.com/800x600/?toy,blocks",
        alt: "Toy blocks",
      },
      {
        id: "p2-img3",
        url: "https://source.unsplash.com/800x600/?wooden,blocks",
        alt: "Wooden blocks",
      },
      {
        id: "p2-img4",
        url: "https://source.unsplash.com/800x600/?colorful,blocks",
        alt: "Colorful blocks",
      },
      {
        id: "p2-img5",
        url: "https://source.unsplash.com/800x600/?stacking,toys",
        alt: "Stacking toys",
      },
    ],
  },
  {
    pageNumber: 3,
    title: "TWIRL, are you ready for your GREATEST adventure?",
    bgColor: "from-cyan-400 to-blue-300",
    images: [
      {
        id: "p3-img1",
        url: "https://source.unsplash.com/800x600/?adventure,sky",
        alt: "Sky adventure",
      },
      {
        id: "p3-img2",
        url: "https://source.unsplash.com/800x600/?travel,freedom",
        alt: "Travel and freedom",
      },
      {
        id: "p3-img3",
        url: "https://source.unsplash.com/800x600/?exploration,clouds",
        alt: "Exploration in the clouds",
      },
    ],
  },
  {
    pageNumber: 4,
    subtitle: "Playing with the ball",
    bgColor: "from-green-300 to-yellow-200",
    images: [
      {
        id: "p4-img1",
        url: "https://source.unsplash.com/800x600/?kids,ball",
        alt: "Kids playing with a ball",
      },
      {
        id: "p4-img2",
        url: "https://source.unsplash.com/800x600/?playground,ball",
        alt: "Ball at playground",
      },
      {
        id: "p4-img3",
        url: "https://source.unsplash.com/800x600/?sports,ball",
        alt: "Sports ball",
      },
      {
        id: "p4-img4",
        url: "https://source.unsplash.com/800x600/?fun,children",
        alt: "Children having fun",
      },
      {
        id: "p4-img5",
        url: "https://source.unsplash.com/800x600/?outdoor,play",
        alt: "Outdoor play",
      },
      {
        id: "p4-img6",
        url: "https://source.unsplash.com/800x600/?toy,ball",
        alt: "Toy ball",
      },
    ],
  },
  {
    pageNumber: 5,
    title: "The End",
    content:
      "What an amazing adventure we've had! Thank you for joining us on this journey through the sky.",
    bgColor: "from-cyan-400 to-blue-300",
    images: [
      {
        id: "p5-img1",
        url: "https://source.unsplash.com/800x600/?sunset,sky",
        alt: "Sunset sky",
      },
      {
        id: "p5-img2",
        url: "https://source.unsplash.com/800x600/?clouds,peaceful",
        alt: "Peaceful clouds",
      },
      {
        id: "p5-img3",
        url: "https://source.unsplash.com/800x600/?journey,ending",
        alt: "Journey ending",
      },
      {
        id: "p5-img4",
        url: "https://source.unsplash.com/800x600/?blue,sky",
        alt: "Blue sky",
      },
    ],
  },
];

// Book Provider Component
function BookProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [selections, setSelections] = useState({});
  const [direction, setDirection] = useState(0);

  const selectImage = (pageIndex, imageId) => {
    setSelections((prev) => ({
      ...prev,
      [pageIndex]: imageId,
    }));
  };

  const goToPage = (pageIndex) => {
    setDirection(pageIndex > currentPage ? 1 : -1);
    setCurrentPage(pageIndex);
  };

  const nextPage = () => {
    if (currentPage < bookPagesData.length - 1) {
      setDirection(1);
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      setDirection(-1);
      setCurrentPage(currentPage - 1);
    }
  };

  const submitSelections = async () => {
    const selectedImages = Object.entries(selections).map(
      ([pageIndex, imageId]) => {
        const page = bookPagesData[pageIndex];
        const image = page.images.find((img) => img.id === imageId);
        return {
          pageNumber: page.pageNumber,
          imageId: imageId,
          imageUrl: image?.url,
        };
      }
    );

    alert(
      `✅ Submitted ${selectedImages.length} of ${bookPagesData.length} pages!\n\nCheck console for full details.`
    );

    // Uncomment to send to server:
    /*
    try {
      const response = await fetch('/api/submit-book-selections', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          selections: selectedImages,
          totalPages: bookPagesData.length,
          completedPages: selectedImages.length
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log("Server response:", data);
        alert("✅ Successfully submitted to server!");
      } else {
        console.error("Failed to submit:", response.status);
        alert("❌ Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("❌ Network error. Please check your connection.");
    }
    */
  };

  const value = {
    currentPage,
    selections,
    direction,
    bookPages: bookPagesData,
    selectImage,
    goToPage,
    nextPage,
    previousPage,
    submitSelections,
  };

  return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
}

// Header Component with Global State Indicators
function BookHeader() {
  const { currentPage, selections, bookPages, goToPage } = useBookContext();

  return (
    <div className="w-full max-w-sm text-center mb-4 mt-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        Rakib's Book Preview
      </h1>
      <p className="text-sm text-gray-600 mb-3">
        Page {bookPages[currentPage].pageNumber} of {bookPages.length}
      </p>

      {/* Page Indicator Dots - Clickable */}
      <div className="flex justify-center gap-2 mb-3">
        {bookPages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx)}
            className={`transition-all rounded-full ${
              idx === currentPage
                ? "bg-purple-500 w-8 h-3"
                : "bg-gray-300 w-3 h-3 hover:bg-gray-400"
            }`}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>

      {/* Selection Status Indicators */}
      <div className="flex justify-center gap-1 text-xs">
        {bookPages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToPage(idx)}
            className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold transition-all ${
              selections[idx]
                ? "bg-green-500 text-white scale-110"
                : "bg-gray-200 text-gray-500 hover:bg-gray-300"
            }`}
          >
            {selections[idx] ? "✓" : idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

// Page Content Slider Component
function PageSlider() {
  const { currentPage, selections, bookPages } = useBookContext();
  const page = bookPages[currentPage];

  return (
    <div className="flex-1 mb-4">
      <div
        key={currentPage}
        className={`relative h-full rounded-3xl bg-linear-to-b ${page.bgColor} p-6 shadow-xl overflow-hidden transition-all duration-500 ease-in-out`}
        style={{
          animation: "slideIn 0.5s ease-out",
        }}
      >
        {/* Decorative circles */}
        <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-white/30 blur-2xl"></div>
        <div className="absolute bottom-8 left-6 w-20 h-20 rounded-full bg-white/20 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-white/10 blur-xl"></div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Title */}
          {page.title && (
            <div className="text-center mb-4">
              <h2 className="text-2xl font-black text-white drop-shadow-lg leading-tight">
                {page.title}
              </h2>
            </div>
          )}

          {/* Main Image Preview Area */}
          <div className="flex-1 flex items-center justify-center mb-4 min-h-[200px]">
            <div className="w-full aspect-square max-w-xs bg-white/20 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center border-4 border-white/40 p-6">
              {selections[currentPage] ? (
                <div className="text-center">
                  <div className="text-6xl mb-3 animate-bounce">✅</div>
                  <p className="text-white font-bold text-lg drop-shadow-md">
                    Image Selected!
                  </p>
                  <p className="text-white/80 text-sm mt-1">
                    Page {page.pageNumber}
                  </p>
                </div>
              ) : (
                <div className="text-center text-white/70">
                  <div className="text-5xl mb-3">📷</div>
                  <p className="text-sm font-semibold">Select an image below</p>
                  <p className="text-xs mt-1 text-white/60">
                    Choose your favorite
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Subtitle or Content */}
          {page.content ? (
            <div className="bg-blue-900/80 backdrop-blur-sm text-white rounded-2xl p-5 text-sm leading-relaxed shadow-lg">
              {page.content}
            </div>
          ) : page.subtitle ? (
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-xl p-3">
              <p className="text-gray-800 font-bold text-base drop-shadow">
                {page.subtitle}
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// Image Selection Grid Component
function ImageSelectionGrid() {
  const { currentPage, selections, bookPages, selectImage } = useBookContext();
  const page = bookPages[currentPage];

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs text-gray-600 font-semibold">
          Select an image for page {page.pageNumber}
        </p>
        {selections[currentPage] && (
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
            Selected ✓
          </span>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {page.images.map((image, idx) => {
          const isSelected = selections[currentPage] === image.id;
          const colors = [
            "bg-gradient-to-br from-red-400 to-pink-500",
            "bg-gradient-to-br from-blue-400 to-cyan-500",
            "bg-gradient-to-br from-yellow-400 to-orange-500",
            "bg-gradient-to-br from-green-400 to-emerald-500",
            "bg-gradient-to-br from-purple-400 to-pink-500",
            "bg-gradient-to-br from-indigo-400 to-blue-500",
          ];

          return (
            <button
              key={image.id}
              onClick={() => selectImage(currentPage, image.id)}
              className={`relative aspect-square rounded-xl ${
                colors[idx % colors.length]
              } transition-all transform hover:scale-105 ${
                isSelected
                  ? "ring-4 ring-purple-500 ring-offset-2 scale-105 shadow-lg"
                  : "ring-2 ring-gray-200 hover:ring-gray-300"
              }`}
            >
              {/* Checkmark */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-purple-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white z-10 animate-bounce">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-white/90 font-semibold drop-shadow-lg">
                  {image.alt}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Navigation Component
function Navigation() {
  const {
    currentPage,
    selections,
    bookPages,
    nextPage,
    previousPage,
    submitSelections,
  } = useBookContext();

  const isLastPage = currentPage === bookPages.length - 1;
  const selectionCount = Object.keys(selections).length;

  return (
    <div className="flex gap-3 mb-4">
      <button
        onClick={previousPage}
        disabled={currentPage === 0}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
        Previous
      </button>
      {isLastPage ? (
        <button
          onClick={submitSelections}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Submit All ({selectionCount}/{bookPages.length})
        </button>
      ) : (
        <button
          onClick={nextPage}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

// Main App Component
export default function BookPreviewApp() {
  return (
    <BookProvider>
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-50 p-4">
        <BookHeader />
        <div className="w-full max-w-sm flex-1 flex flex-col">
          <PageSlider />
          <ImageSelectionGrid />
          <Navigation />
        </div>
      </div>
    </BookProvider>
  );
}
