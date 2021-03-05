import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logitem',
  templateUrl: './logitem.component.html',
  styleUrls: ['./logitem.component.css']
})
export class LogitemComponent implements OnInit {
  @Input() item: string | undefined;
  @Input() type: string | undefined;

  bgType = 'alert-primary';
  
  constructor() { }

  ngOnInit(): void {
    if (this.type == 'danger') {
      this.bgType = 'alert-danger';
    } else if (this.type == 'success') {
      this.bgType = 'alert-success';
    }
  }

}
