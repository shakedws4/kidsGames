import {ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ColorPickerModule} from 'ngx-color-picker';
import party from "party-js";
import {languages} from "../helpers/languages";
import {HttpClient} from "@angular/common/http";
import {Subscription, take} from "rxjs";
import {imagesMappingEn, imagesMappingHe} from "../helpers/images";
import {secretKey} from "../../../../secret";

@Component({
  selector: 'app-letters-maze',
  standalone: true,
  imports: [
    NgForOf, ColorPickerModule,
  ],
  templateUrl: './letters-maze.component.html',
  styleUrl: './letters-maze.component.scss'
})
export class LettersMazeComponent implements OnDestroy {

  public title = languages.HE.maze.title;
  public allLettersString = languages.HE.maze.allLetters;
  public shuffle = languages.HE.maze.shuffle;
  public lang = languages.HE.maze.changeLang;
  public changeColorText = languages.HE.maze.changeColor;
  public squares: string[] = []
  public indexes: number[] = []
  public letter: string = '';
  public relevantIndexes: number[] = [];
  public clickedSquare: boolean[] = [];
  public isMouseDown: boolean = false;
  public counter = 0;
  public color = '#53b78d';
  public imgUrl = '';
  public imagesInCurrentLetter: {link:string}[] = [];
  private _subs = new Subscription();

  @ViewChild('counterElement') counterElement!: ElementRef

  constructor(private _cd: ChangeDetectorRef, private http: HttpClient) {
    this.render();
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

  shuffleClick(): void {
    this.render();
  }

  mouseUp() {
    this.isMouseDown = false;
    this.isGameOver();
  }

  mouseDown() {
    this.isMouseDown = true;
  }

  mouseOver(index: number) {
    if (this.isMouseDown) {
      this.clickedSquare[index] = !this.clickedSquare[index];
    }
  }

  mouseOverLetter(letter: string): void {
    const letterInd = this.allLettersString.split('').findIndex(l => l === letter);
    if (letterInd > -1) {
      this.playAudio(letterInd.toString());
    }
  }

  clicked(index: number): void {
    this.clickedSquare[index] = !this.clickedSquare[index];
  }

  render() {
    this.letter = this.getRandomLetter(this.allLettersString.split(''));
    const newLettersString = this.allLettersString.replace(this.letter, '');
    const letters: string[] = newLettersString.split('');

    this.clickedSquare = new Array(letters.length).fill(false);
    this.squares = new Array(100).fill(0).map(l => this.getRandomLetter(letters))
    this.indexes = new Array(10).fill(0);

    let position = {col: 0, row: 0}
    this.changePath(position);
    this.relevantIndexes = this.getRelevantIndexes();

    this._getImage(this.letter);
  }

  private _getImage(letter: string): void {
    const key = secretKey;
    const q = this.isHebrew() ?
      `להדפסה+${imagesMappingHe[letter]}&searchType=image&imgType=lineart&fileType=png,jpg&lr=lang_iw'}`:
      `animal+for+printing+${imagesMappingEn[letter.toLowerCase()]}&searchType=image&imgType=lineart&fileType=png,jpg&lr=lang_en'}`
    const url = `https://customsearch.googleapis.com/customsearch/v1?key=${key}&cx=b567d7979bb844e9b&q=${q}`;

    this._subs.add(this.http.get<any>(url).pipe(take(1)).subscribe(data => {
      this.imagesInCurrentLetter = data?.items.filter((item: any) => item.link.includes('.png') || item.link.includes('.jpg'));
      const randomInd = Math.floor(Math.random() * this.imagesInCurrentLetter?.length)
      this.imgUrl = this.imagesInCurrentLetter[randomInd]?.link;
      this._cd.detectChanges();
    }));

  }

  public shuffleImage(): void {
    const randomInd = Math.floor(Math.random() * this.imagesInCurrentLetter?.length)
    this.imgUrl = this.imagesInCurrentLetter[randomInd]?.link;
  }

  playAudio(soundFileName: string){
    if (this.isHebrew()) {
      soundFileName = 'he/'+soundFileName;
    } else {
      soundFileName = 'en/'+soundFileName;
    }
    let audio = new Audio();
    audio.src = `../../assets/sounds/letters/${soundFileName}.mp3`;
    audio.load();
    audio.play();
  }

  isHebrew() {
    return this.allLettersString.includes('א');
  }

  getRelevantIndexes(): number[] {
    return this.squares.map((square, index) => {
      return {index, square}
    }).filter(item => item.square === this.letter)
      .map(item => item.index)
  }

  getRandomLetter(letters: string[]) {
    return this.getNextLetter(this.letter)
    // return letters[Math.floor(Math.random() * letters.length)]
  }

  getNextLetter(currentLetter: string): string {
    const lettersArray = this.allLettersString.split('');
    const currentInd = lettersArray.findIndex(l => l === currentLetter);
    return lettersArray[currentInd + 1] ?? lettersArray[0];
  }

  changeLanguage(): void {
    this.allLettersString = languages[this.isHebrew() ? 'EN' : 'HE'].maze.allLetters;
    this.render();
  }


  isGameOver() {
    this._cd.detectChanges();
    const clickedIndexes = this.clickedSquare.map((square, index) => {
      return {index, square}
    }).filter(item => item.square)
      .map(item => item.index)

    if (JSON.stringify(this.relevantIndexes.sort()) === JSON.stringify(clickedIndexes.sort())) {
      this.counter++;
      this.showConfetti()
      this.render();
    }
  }

  showConfetti() {
    party.confetti(this.counterElement.nativeElement);
  }

  changePath(position: { col: number, row: number }): void {
    position = this.changePathInRow(position.col, position.row, 9, this.letter);
    position = this.changePathInCol(position.row, position.col, 9, this.letter);
    if (position.row < 9) {
      this.changePath(position);
    }
  }

  changePathInRow(colInd: number, rowInd: number, max: number, newLetter: string): { col: number, row: number } {
    let index: number;
    let endIndex: number;
    let newColIndex = Math.floor(Math.random() * max);
    if (colInd < newColIndex) {
      index = colInd;
      endIndex = newColIndex;
    } else {
      index = newColIndex;
      endIndex = colInd;
    }
    while (index <= endIndex && index + (rowInd * 10) < 100) {
      this.squares[index + (rowInd * 10)] = newLetter;
      index++;
    }
    return {col: newColIndex, row: rowInd}
  }

  changePathInCol(rowInd: number, colInd: number, max: number, newLetter: string): { col: number, row: number } {
    let index: number;
    let endIndex: number;
    let newRowIndex = Math.floor((Math.random() * (max - rowInd)));
    newRowIndex = Math.max(newRowIndex, 2);
    index = rowInd;
    endIndex = rowInd + newRowIndex;
    while (index <= endIndex && (index * 10) + colInd < 100) {
      this.squares[(index * 10) + colInd] = newLetter;
      index++;
    }
    return {col: colInd, row: endIndex}
  }
}
