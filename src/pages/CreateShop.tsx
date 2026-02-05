import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Store, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import KinboostLogo from "@/components/landing/KinboostLogo";

const CreateShop = () => {
  const navigate = useNavigate();
  const { user, refreshShop } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (name.length < 3) {
      setError("Le nom doit contenir au moins 3 caractères");
      return;
    }

    if (!user) {
      setError("Vous devez être connecté");
      return;
    }

    setIsLoading(true);

    try {
      // Create shop
      const { data: newShop, error: insertError } = await supabase
        .from("shops")
        .insert({
          user_id: user.id,
          name: name.trim(),
          description: description.trim() || null,
        })
        .select("id")
        .single();

      if (insertError) {
        console.error("Insert error:", insertError);
        if (insertError.code === "23505") {
          setError("Vous avez déjà une boutique");
        } else {
          setError("Erreur lors de la création de la boutique");
        }
        setIsLoading(false);
        return;
      }

      // Verify shop is readable (important for RLS)
      const { data: verifiedShop } = await supabase
        .from("shops")
        .select("id")
        .eq("id", newShop.id)
        .single();

      if (!verifiedShop) {
        throw new Error("Shop created but not readable");
      }

      // Refresh auth context
      await refreshShop();

      toast({
        title: "Félicitations ! 🎉",
        description: `Votre boutique "${name}" a été créée avec succès.`,
      });

      // Navigate to dashboard
      navigate("/dashboard", { replace: true });
    } catch (err) {
      console.error("Error creating shop:", err);
      setError("Erreur lors de la création de la boutique");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="p-6">
        <KinboostLogo />
      </header>

      <main className="flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-card rounded-3xl shadow-lg p-8">
            {/* Icon */}
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8 text-primary" />
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl font-bold text-foreground text-center mb-2">
              Créez votre boutique
            </h1>
            <p className="text-muted-foreground text-center mb-8 font-body">
              Donnez vie à votre business en ligne
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Nom de la boutique *
                </label>
                <Input
                  type="text"
                  placeholder="Ma Super Boutique"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 rounded-xl"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Description
                </label>
                <Textarea
                  placeholder="Décrivez votre boutique et ce que vous vendez..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="rounded-xl resize-none min-h-[100px]"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive text-center">{error}</p>
              )}

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Création en cours..."
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Lancer mon business
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Bottom text */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Vous pourrez modifier ces informations plus tard
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default CreateShop;
