import { Permission } from '@/modules/auth/enums/Permission.enum';
import { Controller, ForbiddenException, Get, Inject, Param, Query, Request } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

import { ShopResponseDTO } from '../dto';
import {
  GET_SHOP_SERVICE, IGetShopService,
  LIST_SHOP_SERVICE, IListShopsService,
} from '../services';

type AuthRequest = Request & {
  user?: {
    id?: string;
    permissions?: string[];
    shop_ids?: string[];
  };
};

@Controller('shops')
export class ShopsController {
  constructor(
    @Inject(GET_SHOP_SERVICE)
    private readonly getShopService: IGetShopService,
    @Inject(LIST_SHOP_SERVICE)
    private readonly listShopsService: IListShopsService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar lojas com paginação',
    description: 'Retorna lista paginada de lojas. Suporta busca por nome, status e categoria.',
  })
  @ApiQuery({ name: 'page',       required: false, type: Number,  example: 1,     description: 'Página atual' })
  @ApiQuery({ name: 'limit',      required: false, type: Number,  example: 15,    description: 'Itens por página' })
  @ApiQuery({ name: 'language',   required: false, type: String,  example: 'en'  })
  @ApiQuery({ name: 'search',     required: false, type: String,  example: 'name:marvel', description: 'Filtro no formato campo:valor;campo:valor' })
  @ApiQuery({ name: 'searchJoin', required: false, enum: ['and', 'or'],            example: 'and' })
  @ApiQuery({ name: 'is_active',  required: false, type: Boolean, example: true  })
  @ApiResponse({ status: 200, description: 'Lista paginada de lojas retornada com sucesso' })
  index(
    @Query('page')       page       = '1',
    @Query('limit')      limit      = '15',
    @Query('language')   language   = 'en',
    @Query('search')     search?: string,
    @Query('searchJoin') searchJoin?: string,
    @Query('is_active')  isActive?: string,
  ): Promise<IListShopsService.Result> {
    return this.listShopsService.execute({
      page:       Number(page),
      limit:      Number(limit),
      language,
      search,
      searchJoin,
      isActive:   isActive !== undefined
        ? isActive === '1' || isActive === 'true'
        : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar loja por ID ou slug',
    description:
      'Retorna os dados completos de uma loja. Rota pública; o saldo financeiro é incluído apenas para o dono da loja ou super_admin.',
  })
  @ApiParam({ name: 'id', type: String, description: 'ID ou slug da loja' })
  @ApiQuery({ name: 'language', required: false, type: String, example: 'en' })
  @ApiResponse({ status: 200, type: ShopResponseDTO, description: 'Loja encontrada' })
  @ApiResponse({ status: 404, description: 'Loja não encontrada' })
  show(
    @Param('id')       id: string,
    @Query('language') language = 'en',
    @Request()         req: AuthRequest,
  ) {
    return this.getShopService.execute({
      idOrSlug:                    id,
      language,
      requestingUserId:            req.user ? this.getUserId(req) : undefined,
      requestingUserPermissions:   this.getPermissions(req),
      requestingUserShopIds:       this.getShopIds(req),
    });
  }

  private getPermissions(req: AuthRequest): string[] {
    return req.user?.permissions ?? [];
  }

  private getUserId(req: AuthRequest): string {
    return String(req.user?.id ?? '0');
  }

  private getShopIds(req: AuthRequest): string[] {
    return (req.user?.shop_ids ?? []).map((id) => String(id));
  }

  private requirePermission(permissions: string[], required: Permission): void {
    if (!permissions.includes(required)) {
      throw new ForbiddenException('Ação não autorizada');
    }
  }
}
