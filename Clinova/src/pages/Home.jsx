import React, { useEffect } from "react";
import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";

function Home() {
   useEffect(() => {
      document.title = "Clinova - Manage. Care. Grow.";
   }, []);

   return (
      <div className="h-100">
         <Header />
         <main>

            {/* hero section */}
            <HeroSection />

            
         </main>
      </div>
   );
}

export default Home;
