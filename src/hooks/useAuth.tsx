import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface Shop {
  id: string;
  name: string;
  description: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  shop: Shop | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshShop: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchShop = async (userId: string) => {
    const { data, error } = await supabase
      .from("shops")
      .select("id, name, description")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching shop:", error);
      return null;
    }
    return data;
  };

  const refreshShop = async () => {
    if (user) {
      const shopData = await fetchShop(user.id);
      setShop(shopData);
    }
  };

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        // Defer shop fetch with setTimeout to avoid deadlocks
        if (session?.user) {
          setTimeout(async () => {
            const shopData = await fetchShop(session.user.id);
            setShop(shopData);
            setLoading(false);
          }, 0);
        } else {
          setShop(null);
          setLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchShop(session.user.id).then((shopData) => {
          setShop(shopData);
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setShop(null);
  };

  return (
    <AuthContext.Provider value={{ user, session, shop, loading, signOut, refreshShop }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
