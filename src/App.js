import './App.css';

import { useState, useEffect } from 'react';
import proposalImage from './proposal.png';

const romanticQuotes = [
  "You are the love of my life.",
  "I can't imagine my life without you.",
  "I choose you, today and always.",
  "You complete me.",
];


function QuoteSequence({ quotes, onComplete }) {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (currentQuoteIndex >= quotes.length) {
      onComplete();
      return;
    }

    const quote = quotes[currentQuoteIndex];
    setDisplayedText('');
    setIsTyping(true);

    let charIndex = 0;
    const typingInterval = setInterval(() => {
      if (charIndex < quote.length) {
        setDisplayedText(quote.substring(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
        
        // Wait a bit after typing completes, then move to next quote
        setTimeout(() => {
          setDisplayedText('');
          setTimeout(() => {
            setCurrentQuoteIndex((prev) => prev + 1);
          }, 300);
        }, 2000); // Show complete quote for 2 seconds
      }
    }, 50); // Speed of typing (50ms per character)

    return () => {
      clearInterval(typingInterval);
    };
  }, [currentQuoteIndex, quotes, onComplete]);

  if (currentQuoteIndex >= quotes.length) {
    return null;
  }

  return (
    <div className="quote-sequence quote-sequence--visible">
      <div className="quote-text">
        {displayedText}
        {isTyping && <span className="typewriter-cursor">|</span>}
      </div>
    </div>
  );
}

function ProposalScene({ variant, showAnimation, showProposal }) {
  const sceneClassName =
    'proposal-scene proposal-scene--' + variant + (showAnimation ? ' animate-sequence' : '');

  return (
    <div className={sceneClassName}>
      <div className="proposal-ground" />

      {showAnimation && (
        <>
          <div className="proposal-couple-wrapper">
            <img
              src={proposalImage}
              alt="Proposal illustration"
              className="proposal-couple-image"
            />
          </div>

          <div className="proposal-hearts">
            <span className="heart-pulse">♥</span>
            <span className="heart-pulse">♥</span>
            <span className="heart-pulse">♥</span>
          </div>
        </>
      )}

      {showProposal && (
        <div className="proposal-caption proposal-caption--final">
          <span className="proposal-caption__text">Will you walk through life with me?</span>
          <span className="proposal-caption__ring">💍</span>
        </div>
      )}
    </div>
  );
}

function StartButton({ onStart }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onStart();
    }, 500);
  };

  return (
    <div className={`start-screen ${isClicked ? 'start-screen--fade-out' : ''}`}>
      <button className="start-button" onClick={handleClick}>
        <span className="start-button__text">Start</span>
        <span className="start-button__sparkle">✨</span>
      </button>
    </div>
  );
}

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedVariant] = useState('soft');
  const [playId] = useState(0);
  const [showQuotes, setShowQuotes] = useState(true);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  
  // Reduce snowflakes on mobile for better performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const snowflakeCount = isMobile ? 20 : 50;

  const handleQuotesComplete = () => {
    setShowQuotes(false);
    setShowAnimation(true);
    // After animation completes (much faster now), show proposal
    const animationDuration = selectedVariant === 'soft' ? 1500 : 1000;
    setTimeout(() => {
      setShowProposal(true);
    }, animationDuration + 500);
  };

  return (
    <div className="App">
      <div className="aurora-page">
        <div className="aurora-background-react" />
        <div className="snowfall-container">
          {Array.from({ length: snowflakeCount }).map((_, i) => (
            <div key={i} className="snowflake" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
              opacity: 0.3 + Math.random() * 0.7,
            }} />
          ))}
        </div>
        {!hasStarted ? (
          <StartButton onStart={() => setHasStarted(true)} />
        ) : (
          <div className="aurora-content">
            <div className="proposal-app">
              {showQuotes && (
                <QuoteSequence
                  quotes={romanticQuotes}
                  onComplete={handleQuotesComplete}
                  key={playId}
                />
              )}
              <ProposalScene
                key={selectedVariant + '-' + playId}
                variant={selectedVariant}
                showAnimation={showAnimation}
                showProposal={showProposal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
