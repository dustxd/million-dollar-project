// Constants
const TASK = 'TASK';
const EVENT = 'EVENT';
const NOTE = 'NOTE';
const DEFAULT = 'DEFAULT';
const WITH_NAV = 'WITH_NAV';

// Objects
export const BULLET_DEFINITION = [
  { type: 'TODO', icon: 'lens' },
  { type: 'COMPLETED', icon: 'done' },
  { type: 'SCHEDULED', icon: 'chevron_left' },
  { type: 'MIGRATED', icon: 'chevron_right' },
  { type: EVENT, icon: 'panorama_fish_eye' },
  { type: NOTE, icon: 'remove' },
];

export const LINE_ITEM_TYPES = [
  TASK,
  EVENT,
  NOTE,
];

export const TASK_STATUS = [
  'TODO',
  'COMPLETED',
  'SCHEDULED',
  'MIGRATED',
];

export const HEADER_TYPES = {
  DEFAULT,
  WITH_NAV,
};

export const PAGE_LAYOUT = [
  { type: 'DEFAULT_LAYOUT', headerType: DEFAULT },
  { type: 'DATED_SINGLE_PAGE', headerType: WITH_NAV },
];
