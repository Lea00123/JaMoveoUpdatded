import React from 'react';

// Controls component for scrolling and quit
export const SongControls = ({ scrolling, onToggleScroll, isAdmin, onQuit }) => {
  return (
    <div className="button-container">
      <button onClick={onToggleScroll} className="button">
        {scrolling ? 'Stop Scrolling' : 'Start Scrolling'}
      </button>
      {isAdmin && (
        <button 
          onClick={onQuit} 
          className="button quit-button" 
          style={{ backgroundColor: 'red', color: 'white' }}
        >
          Quit
        </button>
      )}
    </div>
  );
};

// Content component for displaying lyrics and chords
export const SongContent = ({ content, userInstrument, isHebrew, contentRef }) => {
  const renderSection = (section, sectionIndex) => {
    return (
      <div key={sectionIndex} className="song-section">
        {userInstrument !== 'Singer' && Array.isArray(section) && (
          <div className="chord-line">
            {section.map((item, itemIndex) => (
              <span key={`chord-${itemIndex}`} className="chord">
                {item.chords || ' '}
              </span>
            ))}
          </div>
        )}
        <div className={`lyric-line ${isHebrew(Array.isArray(section) ? section[0].lyrics : section) ? 'hebrew' : ''}`}>
          {Array.isArray(section) ? (
            section.map((item, itemIndex) => (
              <span key={`lyrics-${itemIndex}`} className="lyrics">
                {item.lyrics || ''}
              </span>
            ))
          ) : (
            <span className="lyrics">{section || ''}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="song-content" ref={contentRef}>
      {content.map(renderSection)}
    </div>
  );
};