import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CreateAccountRequest {
  email: string;
  storeName: string;
  password: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("create-account function called");

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, storeName, password }: CreateAccountRequest = await req.json();
    console.log("Creating account for:", email, "with store:", storeName);

    if (!email || !storeName || !password) {
      return new Response(
        JSON.stringify({ error: "Tous les champs sont requis" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (storeName.length < 3) {
      return new Response(
        JSON.stringify({ error: "Le nom de boutique doit contenir au moins 3 caractères" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Le mot de passe doit contenir au moins 6 caractères" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email.toLowerCase(),
      password,
      email_confirm: true, // Auto-confirm since we verified via OTP
    });

    if (authError) {
      console.error("Error creating user:", authError);
      
      if (authError.message?.includes("already been registered")) {
        return new Response(
          JSON.stringify({ error: "Cet email est déjà utilisé" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: "Erreur lors de la création du compte" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!authData.user) {
      return new Response(
        JSON.stringify({ error: "Erreur lors de la création du compte" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create profile with store name
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        user_id: authData.user.id,
        store_name: storeName,
      });

    if (profileError) {
      console.error("Error creating profile:", profileError);
      // User created but profile failed - try to clean up
      await supabase.auth.admin.deleteUser(authData.user.id);
      return new Response(
        JSON.stringify({ error: "Erreur lors de la création du profil" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Account created successfully for:", email);

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: { 
          id: authData.user.id, 
          email: authData.user.email 
        } 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(
      JSON.stringify({ error: "Erreur inattendue" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
