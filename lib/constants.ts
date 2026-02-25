/**
 * Centralized constants for the application.
 *
 * Issue #12: Extract magic numbers and constants to a single location.
 */

// Animation timing (in milliseconds)
export const ANIMATION = {
  /** Fast UI feedback */
  FAST: 150,
  /** Standard transitions */
  DEFAULT: 300,
  /** Slower, more deliberate animations */
  SLOW: 500,
  /** Spring easing for smooth transitions */
  SPRING_EASING: "cubic-bezier(0.32, 0.72, 0, 1)",
  /** Standard easing curve */
  STANDARD_EASING: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

// Debate mode constants
export const DEBATE = {
  /** Default number of debate rounds */
  DEFAULT_ROUNDS: 3,
  /** Minimum debate rounds */
  MIN_ROUNDS: 2,
  /** Maximum debate rounds */
  MAX_ROUNDS: 5,
  /** Delay between debate turns (ms) */
  TURN_DELAY: 800,
  /** Delay between rounds (ms) */
  ROUND_DELAY: 1200,
  /** Available round options */
  ROUND_OPTIONS: [2, 3, 4, 5] as readonly number[],
} as const;

// React Flow / Graph constants
export const GRAPH = {
  /** Default viewport configuration */
  DEFAULT_VIEWPORT: { x: -200, y: 0, zoom: 0.8 },
  /** Minimum zoom level */
  MIN_ZOOM: 0.2,
  /** Maximum zoom level */
  MAX_ZOOM: 1.6,
  /** Padding for fit view */
  FIT_VIEW_PADDING: 0.4,
  /** Duration for animated transitions (ms) */
  TRANSITION_DURATION: 800,
  /** Background grid gap */
  GRID_GAP: 24,
  /** Background dot size */
  DOT_SIZE: 1.2,
} as const;

// MiniMap configuration
export const MINIMAP = {
  WIDTH: 160,
  HEIGHT: 100,
  BOTTOM: 24,
  RIGHT: 24,
  Z_INDEX: 40,
} as const;

// Thinking indicator animation
export const THINKING_DOTS = {
  COUNT: 3,
  ANIMATION_DURATION: 1.2,
  DOT_DELAY: 0.2,
} as const;

