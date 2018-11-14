import { Injectable } from "@angular/core";
import { Joke, jokes } from "./turkey-jokes";
import { Subject } from "rxjs";

@Injectable()
export class JokeService {
    jokesCopy: Joke[];
    usedJokes: Joke[];
    jokeSubject: Subject<Joke> = new Subject<Joke>();
    constructor() {
        this.jokesCopy = this.generateJokesArray();
        this.usedJokes = new Array<Joke>();
    }

    getAJoke() {
        let joke = this.getRandomJoke();
        this.jokeSubject.next(joke);
    }

    getRandomJoke(): Joke {
        let index = (Math.floor((Math.random() * this.jokesCopy.length) + 1)) - 1;
        let temp: Joke = this.jokesCopy[index];
        
        // add end of array validation
        let newJokesCopy = this.jokesCopy.filter((joke) => joke !== temp);

        if (newJokesCopy.length == 0) {
            this.jokesCopy = this.generateJokesArray();
            this.usedJokes = new Array<Joke>();
        } else if (!temp) {
            this.resetCount();
        } else {
            this.jokesCopy = newJokesCopy;
            this.usedJokes.push(temp);
        }

        return temp;
    }

    generateJokesArray(): Joke[] {
        return jokes.map(joke => Object.assign({}, joke));
    }

    resetCount() {
        this.jokesCopy = this.generateJokesArray();
        this.getAJoke();
    }
}