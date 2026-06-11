import React from 'react';
import Hero from '../components/Hero';
import ToolGrid from '../components/ToolGrid';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[250px] md:h-[500px] bg-accent/10 blur-[60px] md:blur-[150px] -z-10 rounded-full" />
        <ToolGrid />
      </div>
    </>
  );
};

export default HomePage;
