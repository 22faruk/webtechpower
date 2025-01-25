// Angular modules
import { Component } from '@angular/core';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [SharedAntDesignModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
