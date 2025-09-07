export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          resource_id: string | null
          resource_type: string
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          resource_id?: string | null
          resource_type?: string
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      claims: {
        Row: {
          approved_amount: number | null
          claim_number: string
          claim_type: string
          created_at: string
          denial_reason: string | null
          diagnosis_codes: string[] | null
          id: string
          insurance_company_id: string
          metadata: Json | null
          notes: string | null
          paid_amount: number | null
          patient_id: string
          procedure_codes: string[] | null
          provider_id: string
          service_date: string
          status: string | null
          submission_date: string | null
          submitted_amount: number
          total_amount: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          approved_amount?: number | null
          claim_number: string
          claim_type: string
          created_at?: string
          denial_reason?: string | null
          diagnosis_codes?: string[] | null
          id?: string
          insurance_company_id: string
          metadata?: Json | null
          notes?: string | null
          paid_amount?: number | null
          patient_id: string
          procedure_codes?: string[] | null
          provider_id: string
          service_date: string
          status?: string | null
          submission_date?: string | null
          submitted_amount: number
          total_amount: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          approved_amount?: number | null
          claim_number?: string
          claim_type?: string
          created_at?: string
          denial_reason?: string | null
          diagnosis_codes?: string[] | null
          id?: string
          insurance_company_id?: string
          metadata?: Json | null
          notes?: string | null
          paid_amount?: number | null
          patient_id?: string
          procedure_codes?: string[] | null
          provider_id?: string
          service_date?: string
          status?: string | null
          submission_date?: string | null
          submitted_amount?: number
          total_amount?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "claims_insurance_company_id_fkey"
            columns: ["insurance_company_id"]
            isOneToOne: false
            referencedRelation: "insurance_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "claims_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_inquiries: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          inquiry_type: string
          message: string
          name: string
          phone: string | null
          status: string
          subject: string
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          inquiry_type: string
          message: string
          name: string
          phone?: string | null
          status?: string
          subject: string
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          inquiry_type?: string
          message?: string
          name?: string
          phone?: string | null
          status?: string
          subject?: string
          updated_at?: string
        }
        Relationships: []
      }
      insurance_companies: {
        Row: {
          claim_submission_info: Json | null
          code: string
          contact_info: Json | null
          created_at: string
          id: string
          name: string
          status: string | null
          updated_at: string
        }
        Insert: {
          claim_submission_info?: Json | null
          code: string
          contact_info?: Json | null
          created_at?: string
          id?: string
          name: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          claim_submission_info?: Json | null
          code?: string
          contact_info?: Json | null
          created_at?: string
          id?: string
          name?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      patients: {
        Row: {
          address: Json | null
          created_at: string
          date_of_birth: string
          email: string | null
          emergency_contact: Json | null
          first_name: string
          gender: string | null
          id: string
          insurance_primary: Json | null
          insurance_secondary: Json | null
          last_name: string
          medical_record_number: string | null
          patient_id: string
          phone: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string
          date_of_birth: string
          email?: string | null
          emergency_contact?: Json | null
          first_name: string
          gender?: string | null
          id?: string
          insurance_primary?: Json | null
          insurance_secondary?: Json | null
          last_name: string
          medical_record_number?: string | null
          patient_id: string
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string
          date_of_birth?: string
          email?: string | null
          emergency_contact?: Json | null
          first_name?: string
          gender?: string | null
          id?: string
          insurance_primary?: Json | null
          insurance_secondary?: Json | null
          last_name?: string
          medical_record_number?: string | null
          patient_id?: string
          phone?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          check_number: string | null
          claim_id: string
          created_at: string
          id: string
          payer_name: string
          payment_date: string
          payment_id: string
          payment_method: string | null
          remittance_advice: Json | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          check_number?: string | null
          claim_id: string
          created_at?: string
          id?: string
          payer_name: string
          payment_date: string
          payment_id: string
          payment_method?: string | null
          remittance_advice?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          check_number?: string | null
          claim_id?: string
          created_at?: string
          id?: string
          payer_name?: string
          payment_date?: string
          payment_id?: string
          payment_method?: string | null
          remittance_advice?: Json | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_claim_id_fkey"
            columns: ["claim_id"]
            isOneToOne: false
            referencedRelation: "claims"
            referencedColumns: ["id"]
          },
        ]
      }
      prior_authorizations: {
        Row: {
          approval_criteria: string | null
          authorization_number: string | null
          created_at: string
          diagnosis_codes: string[] | null
          end_date: string | null
          id: string
          insurance_company_id: string
          notes: string | null
          patient_id: string
          procedure_codes: string[] | null
          provider_id: string
          requested_date: string
          service_type: string
          start_date: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          approval_criteria?: string | null
          authorization_number?: string | null
          created_at?: string
          diagnosis_codes?: string[] | null
          end_date?: string | null
          id?: string
          insurance_company_id: string
          notes?: string | null
          patient_id: string
          procedure_codes?: string[] | null
          provider_id: string
          requested_date: string
          service_type: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          approval_criteria?: string | null
          authorization_number?: string | null
          created_at?: string
          diagnosis_codes?: string[] | null
          end_date?: string | null
          id?: string
          insurance_company_id?: string
          notes?: string | null
          patient_id?: string
          procedure_codes?: string[] | null
          provider_id?: string
          requested_date?: string
          service_type?: string
          start_date?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "prior_authorizations_insurance_company_id_fkey"
            columns: ["insurance_company_id"]
            isOneToOne: false
            referencedRelation: "insurance_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prior_authorizations_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "prior_authorizations_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "providers"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          id: string
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      providers: {
        Row: {
          address: Json | null
          created_at: string
          credentials: string[] | null
          email: string | null
          id: string
          license_number: string | null
          name: string
          npi_number: string | null
          phone: string | null
          provider_id: string
          specialty: string | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: Json | null
          created_at?: string
          credentials?: string[] | null
          email?: string | null
          id?: string
          license_number?: string | null
          name: string
          npi_number?: string | null
          phone?: string | null
          provider_id: string
          specialty?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: Json | null
          created_at?: string
          credentials?: string[] | null
          email?: string | null
          id?: string
          license_number?: string | null
          name?: string
          npi_number?: string | null
          phone?: string | null
          provider_id?: string
          specialty?: string | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
