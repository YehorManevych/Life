class List {
    first;

    static find(cell, offset) {
        if (offset == 0) {
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

    static swap(cur_position, a, from, b, to) {
        if (a == undefined && b == undefined) {
            return;
        }

        if (a == undefined && from < 0) {
            if (cur_position + from < first.position) {
                if (b != first) {
                    b.prev.next = b.next;
                    b.next.prev = b.prev;
                    b.prev = undefined;
                    b.next = first;
                    first.prev = b;
                    first = b;
                }
            }else{
                
            }
            b.position = cur_position + from;
            return;
        }
        if (a == undefined && from > 0) {
            if(cur_position + from )
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
        //     if ()
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
}