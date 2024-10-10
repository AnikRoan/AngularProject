import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
    
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  message = "Something went wrong.";
  
  
  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  ngOnDestroy(): void {
     console.log('ngOnDestroy called');
  }
}

