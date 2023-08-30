import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})



export class CardComponent implements OnInit{

  constructor(private datePipe: DatePipe) { 
    
  }


  @Input() task : any;
  @Output() updateClicked = new EventEmitter<string>();


  ngOnInit(): void {  
    console.log(this.task);
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
  }

  updateTask = (id :string) => {
    console.log(id);
    this.updateClicked.emit(id);
    };

}
