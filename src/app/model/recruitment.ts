import { MinInfoPlayer } from '../model/player';

export enum recruitmentState {
    OPEN,
    CLOSED
}
export enum chessColor {
    RAMDOM,
    WHITE,
    BLACK
}
export interface RecruitmentSetup {
    name: string;
    description?: string;
    minPlayers: number;
    maxPlayers: number;
}

export interface RecruitmentChessSetup extends RecruitmentSetup {
    color: chessColor;
    time?: string;
}

export interface RecruitmentCrazyChessSetup extends RecruitmentSetup {
    color: chessColor;
    time?: string;
}

export interface ChinkerSetup extends RecruitmentSetup {
    numCardsInHand: number;
    numGamesOnTable: number;
    isBetsAllowed: boolean;
}


export interface Recruitment {
    id?: string;
    gameType: string;
    name: string;
    description?: string;
    dateCreation: any;
    state: recruitmentState;
    creator: MinInfoPlayer;
    players?: Array<MinInfoPlayer>;
    countPlayers: number;
    minPlayers: number;
    maxPlayers: number;
    config: any;
}
