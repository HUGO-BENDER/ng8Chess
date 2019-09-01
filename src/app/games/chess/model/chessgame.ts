import { GameBase } from 'src/app/model/gamebase';

export interface Chessgame extends GameBase{

    quientieneque: string;
    timeLastTurn: any;
}
