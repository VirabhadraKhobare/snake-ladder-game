import java.util.*;

public class BFSSolver {

    public static class Node {
        int cell;
        int dist;
        List<Integer> path;

        Node(int cell, int dist, List<Integer> path) {
            this.cell = cell;
            this.dist = dist;
            this.path = new ArrayList<>(path);
        }
    }

    public static int findMinDiceThrows(Board board) {
        int N = board.getSize();
        boolean[] visited = new boolean[N];
        Queue<Node> queue = new LinkedList<>();

        List<Integer> startPath = new ArrayList<>();
        startPath.add(0);
        visited[0] = true;
        queue.add(new Node(0, 0, startPath));

        while (!queue.isEmpty()) {
            Node node = queue.poll();
            int cell = node.cell;

            if (cell == N - 1) {
                System.out.println("Path: " + node.path);
                return node.dist;
            }

            for (int dice = 1; dice <= 6 && cell + dice < N; dice++) {
                int nextCell = cell + dice;
                nextCell = board.getDestination(nextCell);

                if (!visited[nextCell]) {
                    visited[nextCell] = true;
                    List<Integer> newPath = new ArrayList<>(node.path);
                    newPath.add(nextCell);
                    queue.add(new Node(nextCell, node.dist + 1, newPath));
                }
            }
        }
        return -1; // unreachable
    }
}
