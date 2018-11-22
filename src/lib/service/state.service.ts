import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { jokes } from "./turkey-jokes";

@Injectable()
export class StateService {
    state: State;
    stateSubject: Subject<State> = new Subject<State>();

    constructor() {
        this.initializeState();
    }

    getState(): State {
        return this.state;
    }

    setState(state: State) {
        this.state = {
            ...this.state,
            ...state
        };
    }

    updateState(state: State) {
        this.setState(state);
        this.stateSubject.next(this.state);
    }

    initializeState() {
        this.setState({
            shouldShowAnswer: false,
            isAnswerButtonEnabled: true,
            answerButtonText: 'Show Answer',
            jokeCount: 0,
            totalJokes: jokes.length
        });
    }
}

export class State {
    shouldShowAnswer: boolean;
    isAnswerButtonEnabled: boolean;
    answerButtonText: string;
    jokeCount: number;
    totalJokes: number;
}