import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecruitmentChessSetup, chessColor } from '../model/chessgame';

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
  optionsColor: OptionCombo[]  = [
    { value: chessColor.RAMDOM, viewValue: 'Game.Chess.ChessColor.RAMDOM' },
    { value: chessColor.WHITE, viewValue: 'Game.Chess.ChessColor.WHITE' },
    { value: chessColor.BLACK, viewValue: 'Game.Chess.ChessColor.BLACK' }
  ];

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

  close() {
    this.dialogRef.close();
  }
}
