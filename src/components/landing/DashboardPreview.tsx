import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Calendar, 
  DollarSign, 
  Settings,
  TrendingUp,
  Users
} from "lucide-react";
import KinboostLogo from "./KinboostLogo";

const DashboardPreview = () => {
  const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", active: false },
    { icon: Package, label: "Produits", active: false },
    { icon: ShoppingCart, label: "Commandes", active: false },
    { icon: Calendar, label: "Événements", active: false },
    { icon: DollarSign, label: "Revenus", active: true },
    { icon: Settings, label: "Paramètres", active: false },
  ];

  const recentSales = [
    { name: "Template Notion Pro", amount: "$25.40", avatar: "M" },
    { name: "E-book Marketing Digital", amount: "$15.00", avatar: "A" },
    { name: "Cours Photoshop Avancé", amount: "$49.00", avatar: "K" },
    { name: "Pack Icons Premium", amount: "$12.00", avatar: "S" },
  ];

  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Tableau de bord
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-4">
            Gérez tout depuis un seul endroit
          </h2>
          <p className="font-body text-background/70 max-w-2xl mx-auto text-lg">
            Un tableau de bord intuitif pour suivre vos ventes, gérer vos produits et développer votre business.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-background rounded-2xl shadow-2xl overflow-hidden border border-border">
            {/* Dashboard header */}
            <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <KinboostLogo size="sm" />
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-muted-foreground">Statistiques Clés</span>
                <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-medium">
                  France 2026
                </button>
              </div>
            </div>

            <div className="flex">
              {/* Sidebar */}
              <div className="hidden md:block w-48 bg-card border-r border-border p-4">
                <nav className="space-y-1">
                  {sidebarItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                          item.active
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Main content */}
              <div className="flex-1 p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Stats card */}
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-display font-bold text-foreground">Statistiques Clés</h3>
                      <div className="flex gap-2">
                        <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">Statistiques</span>
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Stockées</span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-4">$25,450</div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Honoraires</p>
                        <p className="font-medium text-foreground">$39.88</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Revenus</p>
                        <p className="font-medium text-foreground">$31.50</p>
                      </div>
                    </div>
                  </div>

                  {/* Chart placeholder */}
                  <div className="bg-card rounded-xl p-6 border border-border flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border-8 border-primary/30 border-t-primary flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary">K</span>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm text-muted-foreground">Total Revenus</p>
                      <p className="text-lg font-bold text-foreground">$23,455</p>
                    </div>
                  </div>

                  {/* Recent sales */}
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-display font-bold text-foreground mb-4">Ventes Récentes</h3>
                    <div className="space-y-3">
                      {recentSales.map((sale, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                              <span className="text-xs font-bold text-primary">{sale.avatar}</span>
                            </div>
                            <span className="text-sm text-foreground">{sale.name}</span>
                          </div>
                          <span className="text-sm font-medium text-foreground">{sale.amount}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Performance chart */}
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="font-display font-bold text-foreground mb-4">Performance du Mois</h3>
                    <div className="h-24 flex items-end gap-1">
                      {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 80].map((height, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-primary/20 rounded-t"
                          style={{ height: `${height}%` }}
                        >
                          <div 
                            className="w-full bg-primary rounded-t transition-all"
                            style={{ height: `${Math.random() * 40 + 30}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto"
        >
          {[
            { icon: Users, value: "500+", label: "Créateurs actifs" },
            { icon: Package, value: "2,500+", label: "Produits vendus" },
            { icon: DollarSign, value: "$150K+", label: "Revenus générés" },
            { icon: TrendingUp, value: "98%", label: "Satisfaction" },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold text-background">{stat.value}</p>
                <p className="text-sm text-background/60">{stat.label}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;
