interface ShopResponseDTO {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: Record<string, unknown> | null;
  cover_image: Record<string, unknown> | null;
  is_active: boolean;
  address: Record<string, unknown> | null;
  settings: Record<string, unknown> | null;
  notifications: Record<string, unknown> | null;
  created_at: Date;
  updated_at: Date;
}

export interface ListShopsResponseDTO {
  current_page: number;
  data: ShopResponseDTO[];
  last_page: number;
  per_page: number;
  total: number;
}
