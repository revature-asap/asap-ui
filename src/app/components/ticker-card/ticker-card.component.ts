import { Component, Input, OnInit, Output } from '@angular/core';
import { assetQuote } from '../../models/assetQuote.model'

@Component({
  selector: 'app-ticker-card',
  templateUrl: './ticker-card.component.html',
  styleUrls: ['./ticker-card.component.css']
})
export class TickerCardComponent implements OnInit {
  @Input() ticker!: assetQuote;
  constructor() { }

  ngOnInit(): void {
  }

}
