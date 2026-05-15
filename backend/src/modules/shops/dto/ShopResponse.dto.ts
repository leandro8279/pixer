import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ShopBalanceResponseDTO {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 10.5, description: 'Taxa de comissão do admin (%)' })
  admin_commission_rate: number;

  @ApiProperty({ example: 5000.0, description: 'Total acumulado de ganhos' })
  total_earnings: number;

  @ApiProperty({ example: 1200.0, description: 'Valor total sacado' })
  withdrawn_amount: number;

  @ApiProperty({ example: 3800.0, description: 'Saldo atual disponível' })
  current_balance: number;

  @ApiPropertyOptional({
    example: { bank: 'Nubank', account: '1234-5' },
    description: 'Dados bancários/PIX para repasse',
  })
  payment_info?: Record<string, unknown>;
}

export class ShopResponseDTO {
  @ApiProperty({ example: '5' })
  id: string;

  @ApiProperty({ example: 'Minha Loja Legal' })
  name: string;

  @ApiProperty({ example: 'minha-loja-legal', description: 'Slug único da loja' })
  slug: string;

  @ApiPropertyOptional({ example: 'Loja especializada em eletrônicos e gadgets.', nullable: true })
  description?: string | null;

  @ApiProperty({ example: true, description: 'Indica se a loja está ativa e visível' })
  is_active: boolean;

  @ApiPropertyOptional({
    example: {
      id: 1,
      original: 'https://cdn.exemplo.com/logo.png',
      thumbnail: 'https://cdn.exemplo.com/logo_thumb.png',
    },
    nullable: true,
  })
  logo?: Record<string, unknown> | null;

  @ApiPropertyOptional({
    example: {
      id: 2,
      original: 'https://cdn.exemplo.com/cover.jpg',
      thumbnail: 'https://cdn.exemplo.com/cover_thumb.jpg',
    },
    nullable: true,
  })
  cover_image?: Record<string, unknown> | null;

  @ApiPropertyOptional({ example: { contact: '11999990000', website: 'https://minhaloja.com' }, nullable: true })
  settings?: Record<string, unknown> | null;

  @ApiPropertyOptional({
    example: { street_address: 'Av. Paulista, 1000', city: 'São Paulo', state: 'SP', country: 'BR', zip: '01310-100' },
    nullable: true,
  })
  address?: Record<string, unknown> | null;

  @ApiPropertyOptional({
    type: ShopBalanceResponseDTO,
    nullable: true,
    description: 'Dados financeiros (visível apenas para owner e super_admin)',
  })
  balance?: ShopBalanceResponseDTO | null;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2024-06-01T12:00:00.000Z' })
  updated_at: Date;
}

export class PaginatedShopsResponseDto {
  @ApiProperty({ type: [ShopResponseDTO] })
  data: ShopResponseDTO[];

  @ApiProperty({ example: 50 })
  total: number;

  @ApiProperty({ example: 15 })
  per_page: number;

  @ApiProperty({ example: 1 })
  current_page: number;

  @ApiProperty({ example: 4 })
  last_page: number;
}
