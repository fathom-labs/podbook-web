import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

interface BookCoverProps {
  state: 'processing' | 'under-review' | 'post-approval' | 'completed';
  title: string;
  author: string;
  description: string;
}

const BookCover: React.FC<BookCoverProps> = ({ state, title, author, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getStateColor = () => {
    return 'bg-primary';
  };

  return (
    <div className="w-[400px] h-[600px] mx-auto relative" style={{ perspective: '1000px' }}>
      <div 
        className="w-full h-full relative transform-style-preserve-3d transition-all duration-600 ease-out"
        style={{
          transform: `${isFlipped ? 'rotateY(180deg)' : ''} ${isHovered ? 'rotateY(20deg)' : ''}`,
          transformStyle: 'preserve-3d'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Front Cover */}
        <div 
          className={`w-full h-full ${getStateColor()} absolute inset-0 shadow-[rgba(0,0,0,0.15)_0px_1.1px_1.5px,rgba(0,0,0,0.1)_0px_2.8px_3.9px,rgba(0,0,0,0.08)_0px_5.8px_7.9px,rgba(0,0,0,0.06)_0px_12.0455px_16.4px,rgba(0,0,0,0.04)_0px_33px_45px] flex items-center justify-center cursor-pointer`}
          onClick={() => setIsFlipped(true)}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center px-8">
            <h3 className="text-3xl font-bold text-primary-foreground mb-4 leading-tight">{title}</h3>
            <p className="text-lg text-primary-foreground/90">{author}</p>
          </div>
        </div>

        {/* Back Cover */}
        <div 
          className={`w-full h-full ${getStateColor()} absolute inset-0 cursor-pointer shadow-[rgba(0,0,0,0.15)_0px_1.1px_1.5px,rgba(0,0,0,0.1)_0px_2.8px_3.9px,rgba(0,0,0,0.08)_0px_5.8px_7.9px,rgba(0,0,0,0.06)_0px_12.0455px_16.4px,rgba(0,0,0,0.04)_0px_33px_45px]`}
          onClick={() => setIsFlipped(false)}
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden'
          }}
        >
          <div className="absolute bottom-[30px] p-5 text-left">
            <h3 className="text-2xl font-bold text-primary-foreground mb-5">About This Book</h3>
            <p className="text-primary-foreground leading-relaxed mb-5">{description}</p>
            <div className="text-primary-foreground">
              <span className="block mb-5">A comprehensive compilation of the latest technology news and insights from leading industry sources.</span>
              <span className="block mt-[30px]">Curated and organized into a structured book format for easy reading and reference.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCover;
