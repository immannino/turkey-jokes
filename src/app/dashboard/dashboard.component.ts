import { Component, OnInit } from "@angular/core";
import { JokeService } from "../../lib/service/joke.service";
import { Joke } from "../../lib/service/turkey-jokes";
import { StateService, State } from "../../lib/service/state.service";

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html',
    styleUrls: ['dashboard.css']
})
export class DashboardComponent implements OnInit {
    activeJoke: Joke;
    state: State;

    constructor(private jokeService: JokeService, private stateService: StateService) { 
        this.jokeService.jokeSubject.subscribe((joke) => {
            if (!joke) {
                console.log('joke is null?');
                this.reset();
            }

            this.activeJoke = joke;
        });

        this.stateService.stateSubject.subscribe((state) => {
            this.state = {
                ...this.state,
                ...state
            };
        });
    }

    ngOnInit() {
        this.getNewJoke();
        this.state = this.stateService.getState();
    }

    showAnswer() {
        this.stateService.updateState({
            ...this.state,
            shouldShowAnswer: true,
            isAnswerButtonEnabled: false,
            answerButtonText: '🦃😂🦃'
        });
    }

    getNextJoke() {
        this.stateService.updateState({
            ...this.state,
            shouldShowAnswer: false,
            isAnswerButtonEnabled: true,
            answerButtonText: 'Show Answer'
        });
        
        this.getNewJoke();
    }

    getNewJoke() {
        this.jokeService.getAJoke();
    }

    reset() {
        this.activeJoke = null;
        this.jokeService.resetCount();
        this.stateService.initializeState();
        this.state = this.stateService.getState();
    }
}