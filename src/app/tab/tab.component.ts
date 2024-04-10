import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})

export class TabComponent {
  @Output() tabChange = new EventEmitter<string>();
  @Input() activeTab: string = '';

  constructor() { }

  onTabClick(tabName: string) {
    this.tabChange.emit(tabName);
  }
}
