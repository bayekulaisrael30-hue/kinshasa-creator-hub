import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PricingProps {
  onOpenSignup: () => void;
}

const pricingPlans = [
  {
    name: "Démarrer",
    price: "0",
    period: "",
    description: "Parfait pour tester et lancer votre première boutique",
    highlight: "Gratuit pendant 3 mois",
    icon: Zap,
    features: [
      "4% de commission par vente",
      "Jusqu'à 10 produits",
      "Paiements Mobile Money",
      "Tableau de bord basique",
      "Support par email",
    ],
    cta: "Commencer gratuitement",
    popular: false,
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "19",
    period: "/mois",
    description: "Pour les créateurs qui veulent grandir",
    highlight: "Le plus populaire",
    icon: Star,
    features: [
      "2% de commission seulement",
      "Produits illimités",
      "Paiements Mobile Money + Carte",
      "Analytics avancés",
      "Domaine personnalisé",
      "Support prioritaire",
    ],
    cta: "Passer au Pro",
    popular: true,
    variant: "hero" as const,
  },
  {
    name: "Empire",
    price: "49",
    period: "/mois",
    description: "Pour les entreprises et créateurs établis",
    highlight: "Maximum de liberté",
    icon: Crown,
    features: [
      "0% de commission",
      "Tout dans Pro +",
      "API complète",
      "Marque blanche",
      "Manager dédié",
      "Formation personnalisée",
    ],
    cta: "Contacter l'équipe",
    popular: false,
    variant: "secondary" as const,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Pricing = ({ onOpenSignup }: PricingProps) => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Tarification simple
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Choisissez votre formule
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Pas de frais cachés. Commencez gratuitement et évoluez selon vos besoins.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {pricingPlans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                className={`relative bg-card rounded-2xl p-8 shadow-card card-hover ${
                  plan.popular
                    ? "border-2 border-primary md:scale-105 md:-my-4"
                    : "border border-border"
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-button">
                      {plan.highlight}
                    </span>
                  </div>
                )}

                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-3 rounded-xl ${
                      plan.popular
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {plan.name}
                    </h3>
                    {!plan.popular && plan.highlight && (
                      <span className="text-xs font-medium text-primary">
                        {plan.highlight}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="font-display text-5xl font-bold text-foreground">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground font-body">
                    {plan.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground font-body text-sm mb-6">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.popular ? "text-primary" : "text-secondary"
                        }`}
                      />
                      <span className="text-sm text-foreground font-body">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.variant}
                  size="lg"
                  className="w-full"
                  onClick={onOpenSignup}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-12"
        >
          Tous les prix sont en USD. Annulez à tout moment sans engagement.
        </motion.p>
      </div>
    </section>
  );
};

export default Pricing;
