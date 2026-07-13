import {
  BALLOON_LARGE_RADIUS,
  BALLOON_MEDIUM_RADIUS,
  BALLOON_SMALL_RADIUS,
  BALLOON_SPLIT_SPEED_X,
  BALLOON_SPLIT_SPEED_Y,
  GAME_HEIGHT,
  GAME_WIDTH,
  GRAVITY,
  GROUND_HEIGHT,
} from './constants'

export type BalloonTier = 'large' | 'medium' | 'small'

export interface Balloon {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  tier: BalloonTier
}

export function radiusOf(tier: BalloonTier) {
  switch (tier) {
    case 'large':
      return BALLOON_LARGE_RADIUS
    case 'medium':
      return BALLOON_MEDIUM_RADIUS
    case 'small':
      return BALLOON_SMALL_RADIUS
  }
}

const CHILD_TIER: Record<BalloonTier, BalloonTier | null> = {
  large: 'medium',
  medium: 'small',
  small: null,
}

export function stepBalloonPhysics(balloon: Balloon, dt: number): Balloon {
  const radius = radiusOf(balloon.tier)
  let { x, y, vx, vy } = balloon

  vy += GRAVITY * dt
  x += vx * dt
  y += vy * dt

  const groundY = GAME_HEIGHT - GROUND_HEIGHT - radius
  if (y >= groundY) {
    y = groundY
    vy = -vy
  } else if (y <= radius) {
    y = radius
    vy = -vy
  }

  if (x <= radius) {
    x = radius
    vx = -vx
  } else if (x >= GAME_WIDTH - radius) {
    x = GAME_WIDTH - radius
    vx = -vx
  }

  return { ...balloon, x, y, vx, vy }
}

export function isHitByBullet(
  balloon: Balloon,
  bulletX: number,
  bulletYFrom: number,
  bulletYTo: number,
  bulletRadius: number,
) {
  const radius = radiusOf(balloon.tier)
  const withinX = Math.abs(balloon.x - bulletX) <= radius + bulletRadius

  const segTop = Math.min(bulletYFrom, bulletYTo)
  const segBottom = Math.max(bulletYFrom, bulletYTo)
  const withinY = segBottom >= balloon.y - radius && segTop <= balloon.y + radius

  return withinX && withinY
}

let nextId = 1

export function createBalloon(tier: BalloonTier, x: number, y: number, vx: number, vy: number): Balloon {
  return { id: nextId++, x, y, vx, vy, tier }
}

export function splitBalloon(balloon: Balloon): Balloon[] {
  const childTier = CHILD_TIER[balloon.tier]
  if (childTier === null) return []

  return [
    createBalloon(childTier, balloon.x, balloon.y, -BALLOON_SPLIT_SPEED_X, BALLOON_SPLIT_SPEED_Y),
    createBalloon(childTier, balloon.x, balloon.y, BALLOON_SPLIT_SPEED_X, BALLOON_SPLIT_SPEED_Y),
  ]
}
