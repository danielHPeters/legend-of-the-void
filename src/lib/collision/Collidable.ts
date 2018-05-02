/**
 * Type of entity.
 * TODO: Implement more generic and practical method to identify entities easily in an application.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export enum EntityType {
  PLAYER = 'ship',
  ENEMY = 'enemy',
  ENEMY_BULLET = 'bulletEnemy',
  PLAYER_BULLET = 'bullet',
  BACKGROUND = 'background',
  MAP = 'map',
  GAME_OVER = 'gameOver',
  LASER = 'laser',
  MAIN_THEME = 'shockWave',
  EXPLOSION_I = 'explosion1',
  EXPLOSION_II = 'explosion2',
  BOX = 'box',
  ARENA = 'arena'
}

/**
 * Interface for collideable entities.
 *
 * @author Daniel Peters
 * @version 1.0
 */
export default interface Collidable {
  collidesWith: EntityType[]
  colliding: boolean
  type: EntityType

  /**
   *
   * @param {Collidable} other
   * @returns {boolean}
   */
  isCollideAbleWith (other: Collidable): boolean
}
