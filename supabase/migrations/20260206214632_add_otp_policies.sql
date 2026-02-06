/*
  # Fix OTP token table RLS policies

  1. Security
    - Add RLS policies for otp_tokens table to allow Edge Functions to access data
    - Edge Functions use SERVICE_ROLE_KEY so policies target that role
*/

CREATE POLICY "Service role can insert OTP tokens"
  ON public.otp_tokens
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can select OTP tokens"
  ON public.otp_tokens
  FOR SELECT
  TO service_role
  USING (true);

CREATE POLICY "Service role can update OTP tokens"
  ON public.otp_tokens
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete OTP tokens"
  ON public.otp_tokens
  FOR DELETE
  TO service_role
  USING (true);