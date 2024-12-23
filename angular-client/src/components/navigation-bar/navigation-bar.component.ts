// Angular modules
import { Component } from '@angular/core';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzMenuDirective} from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [SharedAntDesignModule, NzTypographyComponent, NzMenuDirective],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {}
