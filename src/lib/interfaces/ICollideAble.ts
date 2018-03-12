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
export default interface ICollideAble {
  collidesWith: EntityType[]
  colliding: boolean
  type: EntityType

  /**
   *
   * @param {ICollideAble} other
   * @returns {boolean}
   */
  isCollideAbleWith (other: ICollideAble): boolean
}
