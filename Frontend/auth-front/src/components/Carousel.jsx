import { useState } from "react";

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
      author: "Nature Explorer",
      role: "Photography",
    },
    {
      image: "https://images.unsplash.com/photo-1469022563149-aa64dbd37050?w=600&h=600&fit=crop",
      author: "Tech Designer",
      role: "UI/UX Design",
    },
    {
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600&h=600&fit=crop",
      author: "Art Director",
      role: "Creative Design",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];

  return (
    <div className="carousel-section">
      <img src={slide.image} alt={slide.author} className="carousel-image" />

      <div className="carousel-content">
        <div className="carousel-user">
          <div className="carousel-avatar">
            {slide.author.charAt(0)}
          </div>
          <div className="carousel-user-info">
            <h3>{slide.author}</h3>
            <p>{slide.role}</p>
          </div>
        </div>

        <div className="carousel-nav">
          <button className="carousel-btn" onClick={prevSlide}>
            ←
          </button>
          <button className="carousel-btn" onClick={nextSlide}>
            →
          </button>
        </div>
      </div>
    </div>
  );
}
