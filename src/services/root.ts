import { AnalyticService } from './analytic';
import { AuthService } from './auth';
import { AuthorService } from './author';
import { BaseService } from './base';
import { CategoryService } from './category';
import { FaqService } from './faq';
import { ManufacturerService } from './manufacturer';
import { NotifyService } from './notify';
import { OrderService } from './order';
import { ProductService } from './product';
import { ReviewService } from './review';
import { SettingsService } from './settings';
import { ShopService } from './shop';
import { TagService } from './tag';
import { TaxeService } from './taxe';
import { TermsAndConditionService } from './termsAndCondition';
import { TypeService } from './type';
import { UploadService } from './upload';
import { UserService } from './user';
import { WithdrawService } from './withdraw';

export class RootService extends BaseService {
  private static _instance: RootService | null = null;

  private constructor() {
    super();
  }

  static getInstance(): RootService {
    if (!RootService._instance) {
      RootService._instance = new RootService();
    }
    return RootService._instance;
  }

  readonly analytic = new AnalyticService();
  readonly auth = new AuthService();
  readonly product = new ProductService();
  readonly category = new CategoryService();
  readonly settings = new SettingsService();
  readonly shop = new ShopService();
  readonly type = new TypeService();
  readonly upload = new UploadService();
  readonly order = new OrderService();
  readonly notify = new NotifyService();
  readonly author = new AuthorService();
  readonly manufacturer = new ManufacturerService();
  readonly withdraw = new WithdrawService();
  readonly tag = new TagService();
  readonly taxe = new TaxeService();
  readonly faq = new FaqService();
  readonly termsAndCondition = new TermsAndConditionService();
  readonly user = new UserService();
  readonly review = new ReviewService();
}

export const rootService = RootService.getInstance();
