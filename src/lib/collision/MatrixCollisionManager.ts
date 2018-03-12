export default class MatrixCollisionManager {
  static detectCollision (arena, player): boolean {
    const arenaMatrix = arena.matrix.mArray
    const m = player.piece.matrix.mArray
    const o = player.piece.position
    for (let y = 0; y < m.length; ++y) {
      for (let x = 0; x < m[y].length; ++x) {
        if (m[y][x] !== 0 &&
          (arenaMatrix[y + o.y] &&
            arenaMatrix[y + o.y][x + o.x]) !== 0) {
          return true
        }
      }
    }
    return false
  }
}
