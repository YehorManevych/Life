let offset = 15;
let cell_size = 10;
let background = "#2c3e50"

let horizon = 15;
let reach = 3;
let colors = ["#e74c3c", "#f1c40f", "#1abc9c", "#8e44ad", "#f39c12", "#2ecc71", "#3498db", "#c0392b", "#2980b9", "#d35400", "#9b59b6", "#bdc3c7", "#16a085", "#e84393", "#27ae60", "#ecf0f1"];

let canvas = document.getElementById('canvas');
// canvas.height = offset + horizon * cell_size;
canvas.height = offset + horizon * cell_size * 4;
canvas.width = 10000;
let c = canvas.getContext('2d');


let lines = [];

class Move {
    constructor(position, from, to, color, prev, next) {
        this.position = position;
        this.from = from;
        this.to = to;
        this.color = color;
        this.prev = prev;
        this.next = next;
        this.text = "MOV " + from + " " + to;
    }

    execute() {
        let find = function (cell, offset) {
            if(offset == 0){
                return cell;
            }
            if (offset < 0) {
                cur_cell = cur_cell.prev;
                for (i = 1; i < -offset; i++) {
                    if (cur_cell == undefined) {
                        return undefined;
                    }
                    if (cur_cell.position == cell.position + offset) {
                        return cur_cell;
                    }
                    if (cur_cell.position < cell.position + offset) {
                        return undefined;
                    }
                    cur_cell = cur_cell.prev;
                }
            }
            if (offset > 0) {
                cur_cell = cur_cell.next;
                for (i = 1; i < offset; i++) {
                    if (cur_cell == undefined) {
                        return undefined;
                    }
                    if (cur_cell.position == cell.position + offset) {
                        return cur_cell;
                    }
                    if (cur_cell.position > cell.position + offset) {
                        return undefined;
                    }
                    cur_cell = cur_cell.next;
                }
            }
            return cur_cell;
        }

        let apply = (obj, f) => {
            if (obj != undefined) {
                f(obj);
            }
        }

        let findFirst = cell => {
            let first = cell;
            while (first.prev != undefined) {
                first = first.prev;
            }
            return first;
        }

        let findLast = cell => {
            let last = cell;
            while (last.next != undefined) {
                last = last.next;
            }
            return last;
        }

        let swap = (cur_position, a, from, b, to) => {
            if (a == undefined && b == undefined) {
                return;
            }

            if (a == undefined && from < 0) {
                let first = findFirst(b);
                if(first.position )
                if (b.prev != undefined) {
                    b.prev.next = b.next;
                    b.next.prev = b.prev;
                    b.prev = undefined;
                    b.next = first;
                    first.prev = b;
                }
                b.position = cur_position + from;
                return;
            }
            if (a == undefined && from > 0) {
                if (b.next != undefined) {
                    let last = findLast(b);
                    b.prev.next = b.next;
                    b.next.prev = b.prev;
                    b.next = undefined;
                    b.prev = last;
                    last.next = b;
                }
                b.position = cur_position + from;
                return;
            }

            // if (b == undefined && to < 0) {
            //     if()
            // }

            apply(a.prev, o => o.next = b);
            apply(a.next, o => o.prev = b);
            apply(b.prev, o => o.next = a);
            apply(b.next, o => o.prev = a);
            let a_prev = a.prev;
            let a_next = a.next;
            let a_position = a.position;
            a.prev = b.prev;
            a.next = b.next;
            a.position = b.position;
            b.prev = a_prev;
            b.next = a_next;
            b.position = a_position;
        }

        let from_cell = find(this, this.from);
        let to_cell = find(this, this.to);

        if (from_cell == undefined) {

        }
    }

    execute(cells) {
        // let from_abs = (this.position + this.from) % horizon
        // from_abs = from_abs < 0 ? horizon + from_abs : from_abs
        let from_abs = (this.position + this.from)
        // let to_abs = (this.position + this.to) % horizon
        // to_abs = to_abs < 0 ? horizon + to_abs : to_abs
        let to_abs = (this.position + this.to)
        // if(cells[from_abs] && cells[to_abs]){
        //     // let temp = cells[from_abs]
        //     // cells[from_abs] = cells[to_abs]
        //     // cells[from_abs].position = from_abs;
        //     cells[from_abs].position = to_abs;
        //     // cells[to_abs] = temp;
        //     // cells[to_abs].position = to_abs;
        //     cells[to_abs].position = from_abs;
        //     lines.push({from:from_abs, to:to_abs, color:this.color});
        //     lines.push({from:to_abs, to:from_abs, color:this.color});            
        // } else 
        if (cells[from_abs]) {
            // cells[to_abs] = cells[from_abs];
            // cells[to_abs].position = to_abs;
            cells[from_abs].position = to_abs;
            // cells[from_abs] = undefined;
            lines.push({ from: from_abs, to: to_abs, color: this.color });
        }
        //else
        if (cells[to_abs]) {
            // cells[from_abs] = cells[to_abs];
            // cells[from_abs].position = from_abs;
            cells[to_abs].position = from_abs;
            // cells[to_abs] = undefined;
            lines.push({ from: to_abs, to: from_abs, color: this.color });
        }
    }
}

// class Empty {
//     constructor(position) {
//         this.position = position
//         this.from = 0
//         this.to = 0
//         this.color = background;
//         this.text = ""
//     }

//     execute(cells) { }
// }


let cells;
let commands;
let pause = false;

function getRandomNonZeroInt(min, max) {
    let r = Math.floor(min + Math.random() * (max - min));
    if (r == 0) {
        return getRandomNonZeroInt(min, max);
    }
    return r;
}

(function setup() {
    cells = []
    commands = []
    color_i = 0
    for (i = 0; i < horizon; i++) {
        if (Math.random() < 0.5) {
            from = getRandomNonZeroInt(-reach, reach)
            to = getRandomNonZeroInt(-reach, reach)
            while (from == to) {
                to = getRandomNonZeroInt(-5, 5);
            }
            cell_color = colors[color_i % colors.length]
            let command = new Move(i, from, to, cell_color)
            cells[i] = command
            commands.push(command)
            color_i = color_i + 1
        }
        //  else {
        //     let command = new Empty(i)
        //     cells[i] = command
        // }
    }

    // for(i = 0; i< commands.length; i++){
    //     c.fillStyle = commands[i].color;
    //     c.fillText(i, offset + i*10, 10);
    // }

    c.fillStyle = background;
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.translate(offset, offset + canvas.height / 2);
    window.scrollTo(0, offset + canvas.heigth / 2);
})();

let j = 0;
let z = 0;

function draw() {
    drawReal();
    action()
}

function drawReal() {
    c.moveTo(0, 0);
    c.lineWidth = 0;
    for (let i in cells) {
        if (cells[i]) {
            console.log(cells[i].position)
            c.fillStyle = cells[i].color;
            c.fillRect(0, i * cell_size, cell_size, cell_size)
        }
    }

    if (commands[j]) {
        let pos = commands[j].position;
        c.beginPath();
        c.strokeStyle = background;
        c.lineWidth = 1;
        c.arc(cell_size / 2, pos * cell_size + cell_size / 2, cell_size / 4, 0, 2 * Math.PI);
        c.stroke();
    }

    while (lines.length > 0) {
        var l = lines.pop();
        // console.log(l);
        if (l) {
            c.beginPath();
            c.lineWidth = 2;
            c.strokeStyle = l.color;
            c.moveTo(-cell_size / 2, l.from * cell_size + cell_size / 2);
            c.lineTo(cell_size / 2, l.to * cell_size + cell_size / 2);
            c.stroke();
        }
    }

    c.translate((cell_size), 0)
}



function action() {
    // if(commands[j]){
    //     commands[j].execute(cells)
    //     j = (j + 1) % commands.length
    //     z++;
    // }
    if (cells[j]) {
        cells[j].execute(cells);
        j = j + 1;
        if (j > cells.)

    }
}

document.onkeydown = e => {
    if (e.code == 'Space') {
        pause = !pause;
    }
    if (e.code == 'ArrowDown') {
        draw();
    }
    return false; // prevent any default behaviour
}

(function run() {
    if (!pause) {
        draw();
    }
    requestAnimationFrame(run);
})();