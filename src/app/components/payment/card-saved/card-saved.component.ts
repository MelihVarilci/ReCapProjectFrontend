import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerDetail } from 'src/app/models/details/customerDetail';
import { FakeCard } from 'src/app/models/entities/fakeCard';
import { FakecardService } from 'src/app/services/fakecard.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-card-saved',
  templateUrl: './card-saved.component.html',
  styleUrls: ['./card-saved.component.css']
})
export class CardSavedComponent implements OnInit {
  cards: FakeCard[];
  currentCustomer: CustomerDetail;
  @Output() selectedCard: EventEmitter<FakeCard> = new EventEmitter<FakeCard>();

  constructor(
    private fakeCardService: FakecardService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.currentCustomer = Object.assign({}, this.localStorageService.getCurrentCustomer());
    this.getCardsByCustomerId(this.currentCustomer.customerId);
  }

  getCardsByCustomerId(customerId: number) {
    this.fakeCardService.getByCustomerId(customerId).subscribe(response => {
      this.cards = response.data;
    });
  }

  selectCard(cardId: number) {
    let selectedCard = this.cards.find(card => card.id == cardId);

    //@ts-ignore
    let newSelectedCard: FakeCard = {
      customerId: selectedCard.customerId,
      nameOnTheCard: selectedCard.nameOnTheCard,
      cardNumber: selectedCard.cardNumber,
      expirationDate: selectedCard.expirationDate,
      cardCvv: selectedCard.cardCvv,
    };

    this.selectedCard.emit(newSelectedCard);
  }
}
