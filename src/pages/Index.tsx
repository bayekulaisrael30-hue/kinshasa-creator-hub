import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DashboardPreview from "@/components/landing/DashboardPreview";
import Pricing from "@/components/landing/Pricing";
import Footer from "@/components/landing/Footer";
import SignupModal from "@/components/landing/SignupModal";

const Index = () => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onOpenSignup={openSignup} />
      <Hero onOpenSignup={openSignup} />
      <Features />
      <DashboardPreview />
      <Pricing onOpenSignup={openSignup} />
      <Footer />
      <SignupModal isOpen={isSignupOpen} onClose={closeSignup} />
    </div>
  );
};

export default Index;
