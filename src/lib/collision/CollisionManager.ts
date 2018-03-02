import QuadTree from './QuadTree'
import ICollisionManager from '../../interfaces/ICollisionManager'

/**
 * Collision manager class.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default class CollisionManager implements ICollisionManager {
  quadTree: QuadTree

  /**
   *
   * @param {QuadTree} quadTree
   */
  constructor (quadTree: QuadTree) {
    this.quadTree = quadTree
  }

  /**
   * Detect collisions.
   */
  detectCollision (): void {
    let objects = []
    this.quadTree.getAllObjects(objects)
    for (let i = 0; i < objects.length; i++) {
      let obj = []
      this.quadTree.findObjects(obj, objects[i])

      for (let j = 0; j < obj.length; j++) {
        // DETECT COLLISION ALGORITHM
        if (objects[i].isCollideAbleWith(obj[j]) &&
          objects[i].left < objects[j].right && objects[i].right > objects[j].left &&
          objects[i].top < objects[j].bottom && objects[i].bottom > objects[j].top) {
          objects[i].colliding = true
          objects[j].colliding = true
        }
      }
    }
  }
}
