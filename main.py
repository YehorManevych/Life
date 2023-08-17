from processing_py import *
import random

OFFSET = 15
CELL_WIDTH = 50

HORIZON = 20
COLORS = ["#e74c3c", "#f1c40f", "#1abc9c", "#8e44ad", "#f39c12", "#2ecc71", "#3498db", "#c0392b", "#2980b9", "#d35400", "#9b59b6", "#bdc3c7", "#16a085", "#34495e", "#27ae60", "#ecf0f1"]

class Move:
    def __init__(self, _from, to, color):
        self._from = _from
        self.to = to
        self.color = color

def execute(cell, cells):
    temp = cells[cell._from]
    cells[cell._from] = cells[cell.to]
    cells[cell.to] = temp

cells = [None]*HORIZON
color_i = 0
for i in range(HORIZON):
    if(random.random() > 0.5):
        _from = random.randint(-5, 5)
        to = random.randint(-5, 5)
        color = COLORS[color_i%HORIZON]
        cells.insert(i, Move(_from, to, color))
        color_i=color_i+1

app = App(600,400)

def main():
    app.background(50, 50, 50)

    while(True):
        mainloop()

    app.exit()

def mainloop():
    height = app.height - 2 * OFFSET
    cell_height = height / HORIZON 

    app.stroke(255)
    for i in range(HORIZON):
        if(cells[i] is not None):
            app.fill(app.unhex("#ffe74c3c"))
        else:
            app.fill(0)
        app.rect(OFFSET, OFFSET+i*cell_height, CELL_WIDTH, cell_height)

    for c in cells:
        if(c is not None):
            execute(c, cells)

    app.redraw()

main()