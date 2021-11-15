import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const hoge = 'やっふーー';
    console.log(hoge);
  }
}
