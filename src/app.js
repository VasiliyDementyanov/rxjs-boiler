import $ from "jquery";
import Rx from "rxjs/Rx";

// interact with html elements

const btn = $("#btn");
const input = $("#input");
const output = $("#output");

const btnStream$ = Rx.Observable.fromEvent(btn, "click");
btnStream$.subscribe(
    (e) => {
        console.log(e);
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log("Completed");
    }
);

const inputStream$ = Rx.Observable.fromEvent(input, "keyup");
inputStream$.subscribe(
    (e) => {
        console.log(e);
        output.append(e.target.value);
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log("Completed");
    }
);

const moveStream$ = Rx.Observable.fromEvent(document, "mousemove");
moveStream$.subscribe(
    (e) => {
        output.html("<h2>X:" + e.clientX + " Y:" + e.clientY + "</h2>");
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log("Completed");
    }
);

// interact with array
const numbers = [33, 44, 55, 66, 77];
const numbers$ = Rx.Observable.from(numbers);
numbers$.subscribe(
    (v) => {
        console.log(v);
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log("Completed");
    }
);

const posts = [
    { tittle: "Post 1", body: "Body 1" },
    { tittle: "Post 2", body: "Body 2" },
    { tittle: "Post 3", body: "Body 3" },
];
const posts$ = Rx.Observable.from(posts);
posts$.subscribe(
    (post) => {
        console.log(post);
        $("#posts").append(
            "<li><h3>" + post.tittle + "</h3>" + post.body + "</li>"
        );
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log("Completed");
    }
);

// observable from scratch
const source$ = new Rx.Observable((observer) => {
    console.log("Creating observable");
    observer.next("Hello world");
    observer.next("Another value");

    //observer.error(new Error("Error: Something went wrong"));

    setTimeout(() => {
        observer.next("Yet another value");
        observer.complete();
    }, 3000);
});

source$
    .catch((err) => {
        Rx.Observable.of(err);
    })
    .subscribe(
        (x) => {
            console.log("in subscribe " + x);
        },
        (err) => {
            console.log(err);
        },
        () => {
            console.log("Completed");
        }
    );

// observable from promise
const myPromise = new Promise((resolve, reject) => {
    console.log("Creating promise");
    setTimeout(() => {
        resolve("Hello from promise");
    }, 5000);
});

const sourcePromise$ = Rx.Observable.fromPromise(myPromise);
sourcePromise$.subscribe((x) => {
    console.log(x);
});

const getUser = (username) => {
    return $.ajax({
        url: "https://api.github.com/users/" + username,
        dataType: "jsonp",
    }).promise();
};

Rx.Observable.fromPromise(getUser("bradtraversy")).subscribe((x) => {
    $("#name").text(x.data.name);
    $("#blog").text(x.data.blog);
    $("#repos").text("Public repos: " + x.data.public_repos);
});

// intervals timer range
const sourceInterval$ = Rx.Observable.interval(1000).take(5);
sourceInterval$.subscribe(
    (x) => {
        console.log(x);
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log("Completed");
    }
);

const sourceTimer$ = Rx.Observable.timer(5000, 2000).take(5);
sourceTimer$.subscribe(
    (x) => {
        console.log(x);
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log("Completed");
    }
);

const sourceRange$ = Rx.Observable.timer(100, 110);
sourceRange$.subscribe(
    (x) => {
        console.log(x);
    },
    (err) => {
        console.log(err);
    },
    () => {
        console.log("Completed");
    }
);
