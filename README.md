# The difference between traditional AI and Machine Learning
AI is the broad concept of mimicking human intelligence, with the aim of performing tasks such as learning and decision-making. Machine learning is a technique within AI that enables computers to learn and improve themselves by analyzing data and using it for tasks such as image recognition, natural language processing, and recommendation systems.

# The difference between Breath First Search and Minimax
## Breath First Search
This algorithm looks at a specific route. I have made an example below. The algorithm starts at node 1. It then looks at which nodes are the neighbors and shows 2. He then looks at where the neighbors of 2 are and puts 3 there and so on.
![BFS voorbeeld](bfs.jpg)

## Minimax
This algorithm looks at every possible step that can be taken per turn. Let's use tic-tac-toe as an example. X is the player and O is the AI. The first step is the starting scenario for the explanation. The second step shows what steps we can take. With the first option, no one wins yet, so O gets a turn. O then has 2 choices where he either wins or loses.
![Minimax voorbeeld](minimax.jpg)

# The time complexity of a search algorithm
The time complexity of an algorithm refers to the extent to which the computation time increases as the size of the task increases. You don't want an algorithm to look infinite steps ahead, but a number of steps.
