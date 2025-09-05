import React, { useState, useEffect } from 'react';

interface Book3DProps {
  pageCount: number;
  title?: string;
  author?: string;
  className?: string;
}

const Book3D: React.FC<Book3DProps> = ({ pageCount, title = "Book Title", author = "Author Name", className = "" }) => {
  const [thickness, setThickness] = useState(40);
  
  // Calculate thickness based on page count (1 page = ~0.067mm, convert to px) - reduced by ~1/3
  useEffect(() => {
    const calculatedThickness = Math.max(20, Math.min(80, pageCount * 0.067 * 3.779527559)); // Convert mm to px
    setThickness(calculatedThickness);
  }, [pageCount]);

  return (
    <div className={`book-3d-container ${className}`} style={{ '--thickness': `${thickness}px` } as React.CSSProperties}>
      <div className="book-wrapper perspective-1500">
        <div className="book transform-style-preserve-3d transition-transform duration-1000 ease-out rotate-x-0 rotate-y-neg-30 hover:rotate-x-5 hover:rotate-y-neg-50">
          {/* Front Cover */}
          <div 
            className="book__front absolute inset-0 rounded-md overflow-hidden bg-white border border-gray-200 shadow-lg"
            style={{ transform: `translateZ(${thickness}px)` }}
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">{title}</h2>
              <p className="text-lg text-gray-600">{author}</p>
            </div>
          </div>
          
          {/* Book Spine/Pages */}
          <div 
            className="book__paper absolute top-1 right-0 bg-white border-l border-gray-200"
            style={{
              height: '98%',
              width: `${thickness * 2}px`,
              background: `
                linear-gradient(90deg, rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0)), 
                repeating-linear-gradient(90deg, white, #e2e2e2 1px, white 3px, #9a9a9a 1px)
              `,
              transform: `rotateY(90deg) translateX(${thickness / 7}px) translateZ(${thickness / 1.2}px)`
            }}
          />
          
          {/* Back Cover */}
          <div 
            className="book__back absolute inset-0 bg-gray-100 rounded-md border border-gray-200 shadow-lg"
            style={{ transform: `translateZ(${-1 * thickness}px)` }}
          >
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">Logo</span>
              </div>
              <p className="text-sm text-gray-500 text-center">
                A comprehensive compilation of content<br />
                curated and organized for easy reading
              </p>
            </div>
          </div>
        </div>
        
        {/* Book Shadow */}
        <div 
          className="book-shadow absolute w-96 opacity-25 blur-4"
          style={{
            height: `${100 + thickness}px`,
            background: 'radial-gradient(70% 85%, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%)',
            transform: 'rotateX(90deg) rotateZ(30deg)',
            transition: 'transform 1s ease'
          }}
        />
      </div>
    </div>
  );
};

export default Book3D;
