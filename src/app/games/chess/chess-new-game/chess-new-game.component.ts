import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RecruitmentSetup } from '../../../model/recruitment';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-chess-new-game',
  templateUrl: './chess-new-game.component.html',
  styleUrls: ['./chess-new-game.component.css']
})
export class ChessNewGameComponent implements OnInit {
  foods: Food[] = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
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
    private fb: FormBuilder,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    const ret: RecruitmentSetup = {
      name: this.firstFormGroup.get('name').value,
      description: this.firstFormGroup.get('description').value,
      maxPlayers: 2,
      minPlayers: 2
    };
    this.dialogRef.close(ret);
  }

  close() {
    this.dialogRef.close();
  }
}
