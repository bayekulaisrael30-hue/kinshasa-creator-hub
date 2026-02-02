import { motion } from "framer-motion";
import { 
  Smartphone, 
  CreditCard, 
  BarChart3, 
  Globe, 
  Shield, 
  Palette 
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Mobile Money intégré",
    description: "Acceptez les paiements Airtel Money, M-Pesa et Orange Money directement.",
  },
  {
    icon: CreditCard,
    title: "Paiements sécurisés",
    description: "Transactions cryptées et protégées pour vous et vos clients.",
  },
  {
    icon: BarChart3,
    title: "Analytics puissants",
    description: "Suivez vos ventes, visiteurs et revenus en temps réel.",
  },
  {
    icon: Globe,
    title: "Votre domaine",
    description: "Obtenez votre propre URL personnalisée pour votre boutique.",
  },
  {
    icon: Shield,
    title: "Protection des fichiers",
    description: "Vos produits numériques sont protégés contre le piratage.",
  },
  {
    icon: Palette,
    title: "Design personnalisable",
    description: "Personnalisez l'apparence de votre boutique à votre image.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Fonctionnalités
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tout ce qu'il vous faut
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Des outils puissants conçus pour les créateurs africains
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                className="bg-card rounded-2xl p-6 shadow-card card-hover border border-border"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
