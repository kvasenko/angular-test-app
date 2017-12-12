import {Component, HostBinding} from '@angular/core';
import {fadeStateTrigger} from './shared/animations/fade.animation';

@Component({
  selector: 'wfm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeStateTrigger]
})
export class AppComponent {
  @HostBinding('@fade') a = true;
}
