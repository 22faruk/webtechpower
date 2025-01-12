import { Component } from '@angular/core';
import {NzContentComponent} from "ng-zorro-antd/layout";

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
    imports: [
        NzContentComponent
    ],
  templateUrl: './dashboard-view.component.html',
  styleUrl: './dashboard-view.component.css'
})
export class DashboardViewComponent {

}
