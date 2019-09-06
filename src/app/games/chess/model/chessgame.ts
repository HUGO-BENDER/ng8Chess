import { GameBase } from 'src/app/model/gamebase';
import { RecruitmentSetup } from 'src/app/model/recruitment';

export enum chessColor {
    RAMDOM = '?',
    WHITE = 'w',
    BLACK = 'b'
}
export interface RecruitmentChessSetup extends RecruitmentSetup {
    color: chessColor;
    time?: string;
}
export interface ChessGame extends GameBase {
    fen?: any;
    gameTurn?: string;
    lastMove?: string;
}

export interface MinInfoChessPlayer {
    uid: any;
    displayName: any;
    color: chessColor;
}