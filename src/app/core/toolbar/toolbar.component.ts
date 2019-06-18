import { Component, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output()
  public menuToggled: EventEmitter<void> = new EventEmitter();

  public get appTitle() {
    return environment.appTitle;
  }

  public handleMenuClick($event): void {
    $event.stopPropagation();
    this.menuToggled.emit();
  }
}
