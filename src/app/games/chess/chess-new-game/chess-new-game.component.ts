import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecruitmentChessSetup, chessColor } from '../model/chessgame';
import { environment } from '../../../../environments/environment';

export interface OptionCombo {
  value: chessColor;
  viewValue: string;
}

export interface DialogData {
  action: string;
  gameId: string;
}

@Component({
  selector: 'app-chess-new-game',
  templateUrl: './chess-new-game.component.html',
  styleUrls: ['./chess-new-game.component.css']
})

export class ChessNewGameComponent implements OnInit {
  IsCopyToClipboard: boolean;

  optionsColor: OptionCombo[]  = [
    { value: chessColor.RAMDOM, viewValue: 'Game.Chess.ChessColor.RAMDOM' },
    { value: chessColor.WHITE, viewValue: 'Game.Chess.ChessColor.WHITE' },
    { value: chessColor.BLACK, viewValue: 'Game.Chess.ChessColor.BLACK' }
  ];

  quickStartFormGroup = this.fb.group({
    quickStartLink1: 'http://localhost:4200/games/chess/' + this.data.gameId + '/anonymousPlayer1',
    quickStartLink2: 'http://localhost:4200/games/chess/' + this.data.gameId + '/anonymousPlayer2'
  });

  firstFormGroup = this.fb.group({
    name: [null, Validators.required],
    description: null
  });

  secondFormGroup = this.fb.group({
    color: [null, Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<ChessNewGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private translate: TranslateService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    if (this.data.action === 'quickStart') {
      // alert(environment.firebaseConfig.authDomain)
    }

  }

  onSubmit() {
    const ret: RecruitmentChessSetup = {
      name: this.firstFormGroup.get('name').value,
      description: this.firstFormGroup.get('description').value,
      maxPlayers: 2,
      minPlayers: 2,
      color: this.secondFormGroup.get('color').value
    };
    this.dialogRef.close(ret);
  }

  close(ret: any) {
    this.dialogRef.close(ret);
  }

  copyInputMessage(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.IsCopyToClipboard = true;
  }









}
