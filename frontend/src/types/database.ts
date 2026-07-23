// B6-2: tipo Database (forma del schema real, escrito a mano a partir de
// supabase/migrations/001_create_skins.sql — no hay proyecto Supabase
// linkeado en este entorno para correr `supabase gen types` vía CLI).
import type { SkinConfig } from './skin';

export interface Database {
  public: {
    Tables: {
      skins: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          config: SkinConfig;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          config: SkinConfig;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          config?: SkinConfig;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
