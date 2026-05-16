import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class ProfileDTO {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiPropertyOptional({ example: 'Apaixonado por tecnologia' })
  bio: string | null;

  @ApiPropertyOptional({ description: 'Objeto de avatar (URL e metadados)' })
  avatar: unknown;

  @ApiPropertyOptional({ description: 'Links de redes sociais do usuário' })
  socials: unknown;

  @ApiPropertyOptional({ example: '+5511999998888' })
  contact: string | null;
}

class WalletDTO {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 500 })
  total_points: number;

  @ApiProperty({ example: 150 })
  points_used: number;

  @ApiProperty({ example: 350 })
  available_points: number;
}

class BalanceDTO {
  @ApiProperty({ example: 12000.0 })
  total_earnings: number;

  @ApiProperty({ example: 3000.0 })
  withdrawn_amount: number;

  @ApiProperty({ example: 9000.0 })
  current_balance: number;
}

class ShopSummaryDTO {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiPropertyOptional({ example: 'Minha Loja' })
  name: string | null;

  @ApiPropertyOptional({ example: 'minha-loja' })
  slug: string | null;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiPropertyOptional({ type: () => BalanceDTO })
  balance: BalanceDTO | null;
}

class AddressDTO {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Casa' })
  title: string;

  @ApiProperty({ example: 'billing' })
  type: string;

  @ApiProperty({ example: true })
  default: boolean;

  @ApiPropertyOptional({ description: 'Objeto com dados do endereço (rua, cidade, CEP etc.)' })
  address: unknown;
}

export class UserResponseDTO {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiPropertyOptional({ example: 'João da Silva' })
  name: string | null;

  @ApiProperty({ example: 'joao@exemplo.com' })
  email: string;

  @ApiPropertyOptional({ example: '2024-01-15T10:30:00.000Z' })
  email_verified_at: Date | null;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiPropertyOptional({ example: '5', description: 'ID da loja gerenciada pelo staff' })
  shop_id: string | null;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2024-06-01T12:00:00.000Z' })
  updated_at: Date;

  @ApiPropertyOptional({ type: () => ProfileDTO })
  profile: ProfileDTO | null;

  @ApiPropertyOptional({ type: () => WalletDTO })
  wallet: WalletDTO | null;

  @ApiProperty({ type: [AddressDTO] })
  addresses: AddressDTO[];

  @ApiProperty({ type: [ShopSummaryDTO], description: 'Lojas das quais o usuário é proprietário' })
  owned_shops: ShopSummaryDTO[];

  @ApiPropertyOptional({ type: () => ShopSummaryDTO, description: 'Loja gerenciada (apenas staff)' })
  managed_shop: ShopSummaryDTO | null;

  @ApiPropertyOptional({ description: 'Último pedido do usuário' })
  last_order: unknown | null;

  @ApiProperty({ type: [String], example: ['customer'] })
  permissions: string[];

  @ApiPropertyOptional({ example: 'customer' })
  role: string | null;
}
