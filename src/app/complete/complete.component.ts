import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {imagesMappingEn, imagesMappingHe} from "../helpers/images";
import {Subscription, take} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {random_word_en, random_word_he} from "../helpers/words";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-complete',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './complete.component.html',
  styleUrl: './complete.component.scss'
})
export class CompleteComponent implements OnInit, OnDestroy{

  private _subs = new Subscription();
  private _language: 'en'| 'he' = 'en';
  public word: string[] = []

  private _renderWord(): void {
    const words = this._isHebrew() ? random_word_he : random_word_en;
    const randomWord =  words[Math.floor(Math.random() * words.length)]
    this.word = randomWord.split('');
  }

  private _isHebrew(): boolean {
    return this._language === 'he';
  }

  public setLanguage(lang: 'en' | 'he'): void {
    this._language = lang;
  }

  ngOnDestroy() {
    this._subs.unsubscribe()
  }

  ngOnInit() {
    this._renderWord()
  }

}
