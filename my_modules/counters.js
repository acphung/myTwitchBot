class Counters {
    constructor(wordList = []) {
        this.counters = {};
        if (Array.isArray(wordList)) {
            for (let i = 0; i < wordList.length; i++) {
                this.counters[wordList[i]] = 0;
            }
        } else if (typeof wordList === "object") {
            this.counters = wordList.counters;
        }
    }

    getValue(name) {
        return this.counters[name];
    }

    addCounter(name) {
        this.counters[name] = 0;
    }

    increment(name, num = 0) {
        this.counters[name] += num;
    }

    decrement(name, num = 0) {
        this.counters[name] -= num;
    }

    reset(name) {
        this.counters[name] = 0;
    }

    deleteCounter(name) {
        let rem = delete this.counters[name];
        console.log(`Deleted ${name} counter: ${rem}`);
    }

    deleteAll() {
        this.counters = {};
    }
}

/*** Export(s) ***/
module.exports = Counters;

// console.log(module);
