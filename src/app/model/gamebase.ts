import { MinInfoPlayer } from '../model/player';

export interface GameBase {
    gameType: string;
    name: string;
    description?: string;
    config?: any;
    dateCreation?: any;
    timeStart?: any;
    Players?: ColPlayers;
    turnCont: number;
    state?: gameState;
    uidPlaying?: string;
}

export interface ColPlayers {
    [uid: string]: MinInfoPlayer;
}

export interface GameInProgress {
    id: string;
    isMyTurn: boolean;
    timeLastTurn: any;
}

export enum gameState {
    PLAYING,
    WAITING,
    FINISHED
}
