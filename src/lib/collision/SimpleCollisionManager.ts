import QuadTree from './QuadTree'
import CollisionManager from './CollisionManager'

/**
 * Basic CollisionManager implementation. Checks rectangles.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class SimpleCollisionManager implements CollisionManager {
  quadTree: QuadTree

  /**
   * Constructor.
   *
   * @param {QuadTree} quadTree
   */
  constructor (quadTree: QuadTree) {
    this.quadTree = quadTree
  }

  /**
   * Collision detection algorithm.
   */
  detectCollision (): void {
    let objects = []
    this.quadTree.getAllObjects(objects)
    for (let i = 0; i < objects.length; i++) {
      let obj = []
      this.quadTree.findObjects(obj, objects[i])

      for (let j = 0; j < obj.length; j++) {
        if (objects[i].isCollideAbleWith(obj[j]) &&
          (Math.floor(objects[i].position.x) < Math.floor(obj[j].position.x) + obj[j].dimension.width &&
            Math.floor(objects[i].position.x) + objects[i].dimension.width > Math.floor(obj[j].position.x) &&
            Math.floor(objects[i].position.y) < Math.floor(obj[j].position.y) + obj[j].dimension.height &&
            Math.floor(objects[i].position.y) + objects[i].dimension.height > Math.floor(obj[j].position.y))
        && objects[i].alive && obj[j].alive) {
          console.log(objects[i])
          objects[i].colliding = true
          obj[j].colliding = true
        }
      }
    }
  }
}
