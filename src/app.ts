fetch('/data/hungary.json').then((resp) => resp.json().then((data) => console.table(data)))
fetch('/data/budapest.json').then((resp) => resp.json().then((data) => console.table(data)))
