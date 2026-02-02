import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowRight, Check, Store, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "email" | "verification" | "storename" | "success";

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [storeName, setStoreName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!email || !email.includes("@")) {
      setError("Veuillez entrer une adresse email valide");
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("verification");
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (verificationCode.length < 6) {
      setError("Le code doit contenir 6 chiffres");
      return;
    }
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("storename");
  };

  const handleStoreNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (storeName.length < 3) {
      setError("Le nom doit contenir au moins 3 caractères");
      return;
    }
    
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setStep("success");
  };

  const resetModal = () => {
    setStep("email");
    setEmail("");
    setVerificationCode("");
    setStoreName("");
    setError("");
    onClose();
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, damping: 25, stiffness: 300 }
    },
    exit: { opacity: 0, scale: 0.95, y: 20 },
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={resetModal}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={resetModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Progress indicator */}
            <div className="px-8 pt-8">
              <div className="flex gap-2 mb-8">
                {["email", "verification", "storename", "success"].map((s, i) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      ["email", "verification", "storename", "success"].indexOf(step) >= i
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="px-8 pb-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Email */}
                {step === "email" && (
                  <motion.div
                    key="email"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                        <Mail className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        Créez votre boutique
                      </h3>
                      <p className="text-muted-foreground font-body">
                        Entrez votre email pour commencer
                      </p>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="h-12 rounded-xl"
                          autoFocus
                        />
                        {error && (
                          <p className="text-sm text-destructive mt-2">{error}</p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          "Envoi en cours..."
                        ) : (
                          <>
                            Continuer
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-muted-foreground text-center mt-6">
                      En continuant, vous acceptez nos{" "}
                      <a href="#" className="text-primary hover:underline">
                        Conditions d'utilisation
                      </a>
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Verification */}
                {step === "verification" && (
                  <motion.div
                    key="verification"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                        <Check className="w-7 h-7 text-secondary" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        Vérifiez votre email
                      </h3>
                      <p className="text-muted-foreground font-body">
                        Nous avons envoyé un code à{" "}
                        <span className="text-foreground font-medium">{email}</span>
                      </p>
                    </div>

                    <form onSubmit={handleVerificationSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="000000"
                          value={verificationCode}
                          onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                          className="h-12 rounded-xl text-center text-2xl tracking-widest font-mono"
                          maxLength={6}
                          autoFocus
                        />
                        {error && (
                          <p className="text-sm text-destructive mt-2">{error}</p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Vérification..." : "Vérifier"}
                      </Button>
                    </form>

                    <button
                      onClick={() => setStep("email")}
                      className="w-full text-sm text-muted-foreground hover:text-foreground text-center mt-4 transition-colors"
                    >
                      ← Modifier l'email
                    </button>
                  </motion.div>
                )}

                {/* Step 3: Store Name */}
                {step === "storename" && (
                  <motion.div
                    key="storename"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <div className="mb-6">
                      <div className="w-14 h-14 bg-accent/20 rounded-2xl flex items-center justify-center mb-4">
                        <Store className="w-7 h-7 text-accent-foreground" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                        Nommez votre boutique
                      </h3>
                      <p className="text-muted-foreground font-body">
                        Choisissez un nom unique pour votre boutique
                      </p>
                    </div>

                    <form onSubmit={handleStoreNameSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="text"
                          placeholder="Ma Super Boutique"
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          className="h-12 rounded-xl"
                          autoFocus
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          votreboutique.kinmarket.cd
                        </p>
                        {error && (
                          <p className="text-sm text-destructive mt-2">{error}</p>
                        )}
                      </div>
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Création..." : "Créer ma boutique"}
                      </Button>
                    </form>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === "success" && (
                  <motion.div
                    key="success"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center py-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <Sparkles className="w-10 h-10 text-primary-foreground" />
                    </motion.div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      Félicitations ! 🎉
                    </h3>
                    <p className="text-muted-foreground font-body mb-6">
                      Votre boutique <span className="font-semibold text-foreground">{storeName}</span> est prête !
                    </p>
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={resetModal}
                    >
                      Accéder à mon tableau de bord
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignupModal;
