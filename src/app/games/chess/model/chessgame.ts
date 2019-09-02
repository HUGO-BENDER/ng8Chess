import { GameBase } from 'src/app/model/gamebase';

export interface Chessgame extends GameBase {

    config?: string;
    timeLastTurn?: any;
}
