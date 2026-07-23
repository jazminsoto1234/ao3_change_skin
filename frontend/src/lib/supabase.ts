'use client';

// B2-2: Setup Supabase Dashboard
// 1. Authentication > Providers > Email: habilitar. Desactivar "Confirm email"
//    (magic link no necesita confirmación separada).
// 2. Authentication > URL Configuration > Redirect URLs: agregar
//    `<sitio>/auth/callback` (ej. http://localhost:3000/auth/callback en dev).
// 3. Las variables de abajo salen de Project Settings > API.

import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '@/types/database';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);

// B6-2: constantes de configuración
export const SKINS_TABLE = 'skins';
