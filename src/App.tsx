import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GameBoyFrame from './components/GameBoyFrame';
import ScreenExpansion from './components/ScreenExpansion';
import FolderBrowser from './components/FolderBrowser';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import AboutSection from './components/sections/AboutSection';
import ContactSection from './components/sections/ContactSection';
import EducationSection from './components/sections/EducationSection';
import ResearchSection from './components/sections/ResearchSection';
import AwardsSection from './components/sections/AwardsSection';
import { usePortfolioNavigation } from './hooks/usePortfolioNavigation';
import { SoundProvider } from './contexts/SoundContext';
import './App.css';

const PortfolioContent = () => {
  const {
    currentView,
    currentSection,
    isAnimating,
    expandToFolders,
    startTransitionToSection,
    commitTransitionToSection,
    backToFolders,
    backToGameboy
  } = usePortfolioNavigation();

  const location = useLocation();

  const renderSection = () => {
    switch (currentSection) {
      case 'experience': return <ExperienceSection onBack={backToFolders} />;
      case 'projects': return <ProjectsSection onBack={backToFolders} />;
      case 'skills': return <SkillsSection onBack={backToFolders} />;
      case 'education': return <EducationSection onBack={backToFolders} />;
      case 'research': return <ResearchSection onBack={backToFolders} />;
      case 'awards': return <AwardsSection onBack={backToFolders} />;
      case 'about': return <AboutSection onBack={backToFolders} />;
      case 'contact': return <ContactSection onBack={backToFolders} />;
      default: return <ExperienceSection onBack={backToFolders} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <ScreenExpansion isExpanding={isAnimating && currentView === 'gameboy'}>
              <GameBoyFrame
                isExpanding={isAnimating && currentView === 'gameboy'}
                onStartClick={expandToFolders}
              />
            </ScreenExpansion>
          }
        />
        <Route
          path="/folders"
          element={
            <FolderBrowser
              onNavigate={startTransitionToSection}
              onTransitionComplete={commitTransitionToSection}
              onHome={backToGameboy}
            />
          }
        />
        <Route
          path="/section/:id"
          element={renderSection()}
        />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <SoundProvider>
      <Router basename="/ranviragarwal.me/">
        <PortfolioContent />
      </Router>
    </SoundProvider>
  );
}

export default App;
