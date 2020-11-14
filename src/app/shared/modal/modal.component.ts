import {Component, ElementRef, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Output() dismiss = new EventEmitter();

  constructor(private el: ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }

  onDismissClick(): void {
    this.dismiss.emit();
  }
}
