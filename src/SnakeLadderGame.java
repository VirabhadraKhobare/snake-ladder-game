public class SnakeLadderGame {
    public static void main(String[] args) {
        int N = 30;
        Board board = new Board(N);

        // Ladders
        board.addLadder(2, 21);
        board.addLadder(4, 7);
        board.addLadder(10, 25);
        board.addLadder(19, 28);

        // Snakes
        board.addSnake(26, 0);
        board.addSnake(20, 8);
        board.addSnake(16, 3);
        board.addSnake(18, 6);

        int minThrows = BFSSolver.findMinDiceThrows(board);
        if (minThrows != -1) {
            System.out.println("Minimum number of dice throws required: " + minThrows);
        } else {
            System.out.println("Destination is unreachable!");
        }
    }
}
