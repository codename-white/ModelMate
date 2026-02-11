import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kvdmoepbvqqkdjmrxnjn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2ZG1vZXBidnFxa2RqbXJ4bmpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MDI3MjUsImV4cCI6MjA4NjM3ODcyNX0.kUd0vY36ThHD7nzTx-JsaGf2vUOAToR6TwHjAgrBGqo";

export const supabase = createClient(supabaseUrl, supabaseKey);
