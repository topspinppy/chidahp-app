// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Download, Type, Move, Plus, X } from 'lucide-react';
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["latin"],
});

const QuoteGenerator = () => {
const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeHandle, setResizeHandle] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [customImage, ] = useState(null);
  const [newQuoteText, setNewQuoteText] = useState('');
  
  const containerRef = useRef(null);

  // Default background images
  const defaultBackgrounds = [
    '/card/quote-card.png',
  ];

  const getCurrentBackground = () => {
    return customImage ?? defaultBackgrounds[0];
  };

  // Calculate responsive font size based on container dimensions
  const getResponsiveFontSize = (quote) => {
    if (!containerRef.current) return quote.fontSize;
    
    const containerWidth = containerRef.current.offsetWidth;
    const baseWidth = 400; // Base width for font size calculation
    const scaleFactor = Math.min(Math.max(containerWidth / baseWidth, 0.5), 2); // Limit scale between 0.5x and 2x
    
    // Calculate font size based on container width and height
    const widthBasedSize = (quote.fontSize * quote.width) / 300; // 300 is base width
    const heightBasedSize = (quote.fontSize * quote.height) / 100; // 100 is base height
    
    // Use the smaller of the two to ensure text fits
    const dynamicSize = Math.min(widthBasedSize, heightBasedSize) * scaleFactor;
    
    return Math.max(12, Math.min(72, dynamicSize)); // Ensure font size is between 12-72px
  };

  // Add new quote
  const addQuote = () => {
    if (newQuoteText.trim()) {
      const newQuote = {
        id: Date.now(),
        text: newQuoteText.trim(),
        position: { x: 50, y: 50 },
        fontSize: 32,
        fontColor: '#ffffff',
        textAlign: 'center',
        width: 300,
        height: 100
      };
      setQuotes([...quotes, newQuote]);
      setNewQuoteText('');
    }
  };

  // Delete quote
  const deleteQuote = (id) => {
    setQuotes(quotes.filter(q => q.id !== id));
    if (selectedQuote?.id === id) {
      setSelectedQuote(null);
    }
  };

  // Update quote
  const updateQuote = (id, updates) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, ...updates } : q));
    if (selectedQuote?.id === id) {
      setSelectedQuote({ ...selectedQuote, ...updates });
    }
  };

  // Handle quote selection
  const handleQuoteClick = useCallback((quote, e) => {
    e.stopPropagation();
    setSelectedQuote(quote);
  }, []);

  // Handle canvas click
  const handleCanvasClick = useCallback(() => {
    if (!isDragging && !isResizing) {
      setSelectedQuote(null);
    }
  }, [isDragging, isResizing]);

  // Mouse handlers for dragging and resizing
  const handleMouseDown = useCallback((e, quote, action = 'drag') => {
    e.stopPropagation();
    setSelectedQuote(quote);
    
    if (action === 'drag') {
      setIsDragging(true);
      const quoteElement = e.currentTarget.closest('[data-quote-container]');
      const quoteRect = quoteElement.getBoundingClientRect();
      
      setDragOffset({
        x: e.clientX - quoteRect.left - quoteRect.width / 2,
        y: e.clientY - quoteRect.top - quoteRect.height / 2
      });
    } else if (action === 'resize') {
      setIsResizing(true);
      setResizeHandle(e.currentTarget.dataset.handle);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging && selectedQuote && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
      const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;
      
      const newPosition = {
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y))
      };
      
      updateQuote(selectedQuote.id, { position: newPosition });
    } else if (isResizing && selectedQuote && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;
      
      if (resizeHandle === 'width') {
        const mouseX = e.clientX - rect.left;
        const quoteX = (selectedQuote.position.x / 100) * containerWidth;
        const newWidth = Math.abs(mouseX - quoteX) * 2;
        const clampedWidth = Math.max(100, Math.min(500, newWidth));
        updateQuote(selectedQuote.id, { width: clampedWidth });
      } else if (resizeHandle === 'height') {
        const mouseY = e.clientY - rect.top;
        const quoteY = (selectedQuote.position.y / 100) * containerHeight;
        const newHeight = Math.abs(mouseY - quoteY) * 2;
        const clampedHeight = Math.max(50, Math.min(300, newHeight));
        updateQuote(selectedQuote.id, { height: clampedHeight });
      }
    }
  }, [isDragging, isResizing, selectedQuote, dragOffset, resizeHandle]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
    setResizeHandle(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  // Global mouse event listeners
  React.useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  const downloadImage = async () => {
    if (!containerRef.current) return;

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 1080;
      canvas.height = 1080;

      // Load and draw background image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = getCurrentBackground();
      });

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw all quotes with responsive sizing
      quotes.forEach(quote => {
        if (quote.text.trim()) {
          // Calculate responsive font size for export
          const exportFontSize = getResponsiveFontSize(quote) * 2; // Scale up for high resolution
          
          ctx.font = `${exportFontSize}px ${notoSansThai.style.fontFamily}, sans-serif`;
          ctx.fillStyle = quote.fontColor;
          ctx.textAlign = quote.textAlign;
          ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetX = 2;
          ctx.shadowOffsetY = 2;

          const x = (quote.position.x / 100) * canvas.width;
          const y = (quote.position.y / 100) * canvas.height;

          const lines = quote.text.split('\n');
          const lineHeight = exportFontSize * 1.2;
          
          lines.forEach((line, index) => {
            ctx.fillText(line, x, y + (index * lineHeight));
          });
        }
      });

      const link = document.createElement('a');
      link.download = 'instagram-quote-1080x1080.png';
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating image. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-500 via-yellow-600 to-black p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            ชูโล่ Quote Generator
          </h1>
          <p className="text-lg text-gray-300">
            Tools สำหรับสร้าง Quote เก็บไว้เป็นความทรงจำ สำหรับนักเรียนชูโล่
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Image Canvas */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div
                ref={containerRef}
                className="relative w-full aspect-square rounded-xl overflow-hidden group"
                onClick={handleCanvasClick}
                style={{
                  backgroundImage: `url(${getCurrentBackground()})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Empty state hint */}
                {quotes.length === 0 && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Type className="w-12 h-12 mx-auto mb-2" />
                      <p className="text-lg font-medium">Add quotes using the panel on the right</p>
                    </div>
                  </div>
                )}

                {/* Render all quotes */}
                {quotes.map(quote => {
                  const responsiveFontSize = getResponsiveFontSize(quote);
                  
                  return (
                    <div
                      key={quote.id}
                      data-quote-container
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 select-none group/quote ${
                        selectedQuote?.id === quote.id ? 'ring-2 ring-blue-400' : ''
                      }`}
                      style={{
                        left: `${quote.position.x}%`,
                        top: `${quote.position.y}%`,
                        width: `${quote.width}px`,
                        minHeight: `${quote.height}px`,
                      }}
                      onClick={(e) => handleQuoteClick(quote, e)}
                    >
                      {/* Text content with responsive sizing */}
                      <div
                        className="cursor-move w-full h-full flex items-center justify-center"
                        style={{
                          fontSize: `${responsiveFontSize}px`,
                          color: quote.fontColor,
                          textAlign: quote.textAlign,
                          textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                          fontWeight: '600',
                          lineHeight: '1.2',
                          wordWrap: 'break-word',
                          overflow: 'hidden'
                        }}
                        onMouseDown={(e) => handleMouseDown(e, quote, 'drag')}
                      >
                        <div>
                          {quote.text.split('\n').map((line, index) => (
                            <div key={index}>{line}</div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Controls for selected quote */}
                      {selectedQuote?.id === quote.id && (
                        <>
                          {/* Drag indicator */}
                          {isDragging && (
                            <Move className="absolute -top-8 -right-8 w-6 h-6 text-white/70" />
                          )}
                          
                          {/* Delete button */}
                          <button
                            className="absolute -top-6 -right-6 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover/quote:opacity-100 transition-opacity z-10"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteQuote(quote.id);
                            }}
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>

                          {/* Resize handles */}
                          <div
                            className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full cursor-ew-resize opacity-80 hover:opacity-100"
                            data-handle="width"
                            onMouseDown={(e) => handleMouseDown(e, quote, 'resize')}
                          />
                          <div
                            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-4 h-4 bg-blue-500 rounded-full cursor-ns-resize opacity-80 hover:opacity-100"
                            data-handle="height"
                            onMouseDown={(e) => handleMouseDown(e, quote, 'resize')}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Save Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={downloadImage}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  <Download className="w-5 h-5" />
                  Save Image
                </button>
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            {/* Add Quote */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Quote
              </h3>
              
              <div className="space-y-4">
                <textarea
                  value={newQuoteText}
                  onChange={(e) => setNewQuoteText(e.target.value)}
                  className="w-full bg-white/20 text-white px-4 py-3 rounded-lg border border-white/20 placeholder-white/50 resize-none"
                  rows="4"
                  placeholder="Enter your quote here..."
                />
                <button
                  onClick={addQuote}
                  disabled={!newQuoteText.trim()}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  Add Quote
                </button>
              </div>
            </div>

            {/* Quote List */}
            {quotes.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4">Quotes ({quotes.length})</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {quotes.map(quote => (
                    <div
                      key={quote.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedQuote?.id === quote.id 
                          ? 'bg-blue-500/30 border border-blue-400' 
                          : 'bg-white/10 hover:bg-white/20'
                      }`}
                      onClick={() => setSelectedQuote(quote)}
                    >
                      <div className="text-white text-sm truncate">
                        {quote.text.substring(0, 50)}...
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Text Styling - Only show when quote is selected */}
            {selectedQuote && (
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Type className="w-5 h-5" />
                  Style Selected Quote
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Base Font Size 
                      <span className="text-white/60">(Auto-scales with container)</span>
                    </label>
                    <input
                      type="range"
                      min="16"
                      max="72"
                      value={selectedQuote.fontSize}
                      onChange={(e) => updateQuote(selectedQuote.id, { fontSize: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-white/60 text-sm mt-1">
                      Base: {selectedQuote.fontSize}px | 
                      Current: {Math.round(getResponsiveFontSize(selectedQuote))}px
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Text Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedQuote.fontColor}
                        onChange={(e) => updateQuote(selectedQuote.id, { fontColor: e.target.value })}
                        className="w-12 h-8 rounded border border-white/20"
                      />
                      <input
                        type="text"
                        value={selectedQuote.fontColor}
                        onChange={(e) => updateQuote(selectedQuote.id, { fontColor: e.target.value })}
                        className="flex-1 bg-white/20 text-white px-3 py-1 rounded border border-white/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Text Alignment</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['left', 'center', 'right'].map((align) => (
                        <button
                          key={align}
                          onClick={() => updateQuote(selectedQuote.id, { textAlign: align })}
                          className={`py-2 px-3 rounded text-sm capitalize transition-colors ${
                            selectedQuote.textAlign === align
                              ? 'bg-blue-500 text-white'
                              : 'bg-white/20 text-white/80 hover:bg-white/30'
                          }`}
                        >
                          {align}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Width <span className="text-white/60">(affects text size)</span>
                    </label>
                    <input
                      type="range"
                      min="100"
                      max="500"
                      value={selectedQuote.width}
                      onChange={(e) => updateQuote(selectedQuote.id, { width: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-white/60 text-sm mt-1">{selectedQuote.width}px</div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">
                      Height <span className="text-white/60">(affects text size)</span>
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="300"
                      value={selectedQuote.height}
                      onChange={(e) => updateQuote(selectedQuote.id, { height: parseInt(e.target.value) })}
                      className="w-full"
                    />
                    <div className="text-white/60 text-sm mt-1">{selectedQuote.height}px</div>
                  </div>

                  <button
                    onClick={() => deleteQuote(selectedQuote.id)}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
                  >
                    Delete Quote
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;