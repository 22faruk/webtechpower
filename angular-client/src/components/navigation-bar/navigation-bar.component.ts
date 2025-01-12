// Angular modules
import {Component, inject} from '@angular/core';

// Custom modules
import { SharedAntDesignModule } from '../../module/shared-ant-design/shared-ant-design.module';
import {NzTypographyComponent} from 'ng-zorro-antd/typography';
import {NzMenuDirective} from 'ng-zorro-antd/menu';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [SharedAntDesignModule, NzTypographyComponent, NzMenuDirective],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {
  router=inject(Router)


  navigateToHome(){
    this.router.navigate(['/dashboard']);
  }
  navigateToFlashcards(){
    this.router.navigate(['/flashcards']);
  }
  navigateToQuiz(){
    this.router.navigate(['/quiz']);
  }
  navigateToFriends(){
    this.router.navigate(['/friends']);
  }
}
