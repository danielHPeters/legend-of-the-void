import Vector2 from '../math/Vector2'

export interface Circle {
  x: number
  y: number
  r: number
}

export interface Square {
  x: number
  y: number
  width: number
  height: number
}

export default abstract class CollisionHelpers {
  static circleSquareCollision (circle: Circle, rect: Square): boolean {
    const distance = new Vector2(Math.abs(circle.x - rect.x), Math.abs(circle.y - rect.y))

    if (distance.x > (rect.width / 2 + circle.r)) { return false }
    if (distance.y > (rect.height / 2 + circle.r)) { return false }

    if (distance.x <= (rect.width / 2)) { return true }
    if (distance.y <= (rect.height / 2)) { return true }

    const cornerDistanceSq = Math.pow(distance.x - rect.width / 2, 2) +
      Math.pow(distance.y - rect.height / 2, 2)

    return (cornerDistanceSq <= (Math.pow(circle.r, 2)))
  }
}
