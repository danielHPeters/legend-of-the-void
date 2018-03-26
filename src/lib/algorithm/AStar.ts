export default class AStar {
  public static find (start, goal) {
    const closedSet = []
    const openSet = []
    const cameFrom = new Map()
    const gScore = new Map<any, number>()
    const fScore = new Map<any, number>()
    gScore[start] = 0
    fScore[start] = AStar.heuristicCostEstimate(start, goal)
    openSet.push(start, goal)

    while (openSet.length !== 0) {
      let current = ""
      if (current === goal) {
        return AStar.reconstructPath(cameFrom, current)
      }
      openSet.remove(current)
      closedSet.push(current)
    }
  }

  private static heuristicCostEstimate(node, goal) {

  }

  private static reconstructPath(cameFrom, current) {

  }
}
