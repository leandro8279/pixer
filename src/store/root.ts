import type { RootService } from '@/services/root';

import { AnalyticStore } from './analytic';
import { AppStore } from './app';
import { AuthStore } from './auth';
import { AuthorStore } from './author';
import { CategoryStore } from './category';
import { FaqStore } from './faq';
import { ManufacturerStore } from './manufacturer';
import { NotifyStore } from './notify';
import { OrderStore } from './order';
import { ProductStore } from './product';
import { SettingStore } from './setting';
import { ShopStore } from './shop';
import { TagStore } from './tag';
import { TaxeStore } from './taxe';
import { TermsAndConditionStore } from './termsAndCondition';
import { TypeStore } from './type';
import { UploadStore } from './upload';
import { WithdrawStore } from './withdraw';

export class RootStore {
  readonly app: AppStore;
  readonly auth: AuthStore;
  readonly setting: SettingStore;
  readonly shop: ShopStore;
  readonly analytic: AnalyticStore;
  readonly type: TypeStore;
  readonly upload: UploadStore;
  readonly notify: NotifyStore;
  readonly order: OrderStore;
  readonly category: CategoryStore;
  readonly author: AuthorStore;
  readonly manufacturer: ManufacturerStore;
  readonly product: ProductStore;
  readonly withdraw: WithdrawStore;
  readonly tag: TagStore;
  readonly taxe: TaxeStore;
  readonly faq: FaqStore;
  readonly termsAndCondition: TermsAndConditionStore;
  constructor(private readonly service: RootService) {
    this.app = new AppStore();
    this.analytic = new AnalyticStore(this.service);
    this.auth = new AuthStore(this.service);
    this.setting = new SettingStore(this.service);
    this.shop = new ShopStore(this, this.service);
    this.type = new TypeStore(this.service);
    this.upload = new UploadStore(this.service);
    this.notify = new NotifyStore(this, this.service);
    this.order = new OrderStore(this, service);
    this.product = new ProductStore(this, this.service);
    this.category = new CategoryStore(this, this.service);
    this.author = new AuthorStore(this, this.service);
    this.manufacturer = new ManufacturerStore(this, this.service);
    this.withdraw = new WithdrawStore(this, this.service);
    this.tag = new TagStore(this, this.service);
    this.taxe = new TaxeStore(this, this.service);
    this.faq = new FaqStore(this, this.service);
    this.termsAndCondition = new TermsAndConditionStore(this, this.service);
  }
}
