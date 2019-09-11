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
    Players?: { [uid: string]: MinInfoChessPlayer };
    position: string;
    gameTurn?: string;
    lastMove?: string;
}

export interface MinInfoChessPlayer {
    uid: any;
    displayName: any;
    color: chessColor;
}

export interface ChessMove {
    from: string;
    to: string;
    promotion: string;
}

export interface CapturePieces {
    w: {p: number, n: number, b: number, r: number, q: number};
    b: {p: number, n: number, b: number, r: number, q: number};
}
