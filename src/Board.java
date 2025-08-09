import java.util.HashMap;
import java.util.Map;

public class Board {
    private final int size;
    private final int[] move; // move[i] = destination cell if snake/ladder exists, else -1

    public Board(int size) {
        this.size = size;
        this.move = new int[size];
        for (int i = 0; i < size; i++) {
            move[i] = -1; // normal cell
        }
    }

    public void addLadder(int start, int end) {
        if (start < end && start >= 0 && end < size) {
            move[start] = end;
        }
    }

    public void addSnake(int start, int end) {
        if (start > end && start >= 0 && end < size) {
            move[start] = end;
        }
    }

    public int getSize() {
        return size;
    }

    public int getDestination(int cell) {
        if (move[cell] != -1) return move[cell];
        return cell;
    }

    public int[] getMoveArray() {
        return move;
    }

    public Map<Integer, Integer> getSnakes() {
        Map<Integer, Integer> snakes = new HashMap<>();
        for (int i = 0; i < size; i++) {
            if (move[i] != -1 && move[i] < i) {
                snakes.put(i, move[i]);
            }
        }
        return snakes;
    }

    public Map<Integer, Integer> getLadders() {
        Map<Integer, Integer> ladders = new HashMap<>();
        for (int i = 0; i < size; i++) {
            if (move[i] != -1 && move[i] > i) {
                ladders.put(i, move[i]);
            }
        }
        return ladders;
    }
}
