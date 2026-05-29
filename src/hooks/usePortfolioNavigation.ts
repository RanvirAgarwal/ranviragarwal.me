import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export type ViewState = 'gameboy' | 'expanded' | 'section';
export type SectionState = 'home' | 'experience' | 'projects' | 'skills' | 'about' | 'contact' | 'education' | 'research' | 'awards' | 'gameover' | null;

export const usePortfolioNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine initial state based on current URL
  const getInitialView = (): ViewState => {
    if (location.pathname === '/') return 'gameboy';
    if (location.pathname === '/folders') return 'expanded';
    if (location.pathname.startsWith('/section/')) return 'section';
    return 'gameboy';
  };

  const getInitialSection = (): SectionState => {
    if (location.pathname.startsWith('/section/')) {
      const section = location.pathname.split('/')[2];
      return section as SectionState;
    }
    return null;
  };

  const [currentView, setCurrentView] = useState<ViewState>(getInitialView());
  const [currentSection, setCurrentSection] = useState<SectionState>(getInitialSection());
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger expansion from Gameboy to Folders
  const expandToFolders = useCallback(() => {
    if (isAnimating || currentView !== 'gameboy') return;
    setIsAnimating(true);
    setCurrentView('expanded');
    
    // Wait for the expansion animation (800ms) before changing route
    setTimeout(() => {
      navigate('/folders');
      setIsAnimating(false);
    }, 800);
  }, [isAnimating, currentView, navigate]);

  // Start transition from Folders to Section (shows Mario animation)
  const startTransitionToSection = useCallback((section: SectionState) => {
    if (isAnimating || currentView !== 'expanded' || !section) return;
    setIsAnimating(true);
    setCurrentSection(section);
  }, [isAnimating, currentView]);

  // Complete the transition and actually change the route
  const commitTransitionToSection = useCallback(() => {
    if (!currentSection) return;
    setCurrentView('section');
    navigate(`/section/${currentSection}`);
    setIsAnimating(false);
  }, [currentSection, navigate]);

  // Trigger transition from Section back to Folders
  const backToFolders = useCallback(() => {
    if (isAnimating || currentView !== 'section') return;
    setIsAnimating(true);
    
    // Quick fade out or transition (300ms)
    setTimeout(() => {
      setCurrentView('expanded');
      setCurrentSection(null);
      navigate('/folders');
      setIsAnimating(false);
    }, 300);
  }, [isAnimating, currentView, navigate]);
  
  // Return to gameboy view from folders
  const backToGameboy = useCallback(() => {
    if (isAnimating || currentView !== 'expanded') return;
    setIsAnimating(true);
    
    // Quick transition (800ms) reverse expansion
    setTimeout(() => {
      setCurrentView('gameboy');
      navigate('/');
      setIsAnimating(false);
    }, 800);
  }, [isAnimating, currentView, navigate]);

  return {
    currentView,
    currentSection,
    isAnimating,
    expandToFolders,
    startTransitionToSection,
    commitTransitionToSection,
    backToFolders,
    backToGameboy
  };
};
