// Angular modules
import { NgModule } from '@angular/core';

// Ant design modules
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import {NzProgressComponent} from 'ng-zorro-antd/progress';
import {NzImageModule} from 'ng-zorro-antd/image';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzMenuDirective} from 'ng-zorro-antd/menu';
import {NzOptionComponent, NzSelectComponent} from 'ng-zorro-antd/select';

const antDesignComponents = [
  NzButtonModule,
  NzDividerModule,
  NzGridModule,
  NzInputModule,
  NzLayoutModule,
  NzIconModule,
  NzCardModule,
  NzAvatarModule,
  NzProgressComponent,
  NzImageModule,
  NzTypographyComponent,
  NzMenuDirective,
  NzSelectComponent,
  NzOptionComponent,
];

@NgModule({
  declarations: [],
  imports: antDesignComponents,
  exports: antDesignComponents,
})
export class SharedAntDesignModule {}
