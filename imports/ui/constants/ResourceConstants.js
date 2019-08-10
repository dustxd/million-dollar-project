// Constants
const TASK = 'TASK';
const EVENT = 'EVENT';
const NOTE = 'NOTE';
const DEFAULT_LAYOUT = 'DEFAULT_LAYOUT';
const DATED_SINGLE_PAGE = 'DATED_SINGLE_PAGE';
const DATED_WEEK_VIEW = 'DATED_WEEK_VIEW';
const DEFAULT = 'DEFAULT';
const WITH_NAV = 'WITH_NAV';
const WEEK_VIEW = 'WEEK_VIEW';
const MIN_DATE = new Date('1900-01-01');
const MAX_DATE = new Date('2100-01-01');
const NUM_PREVIEW_ITEMS = 3;

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

export const PAGE_LAYOUT_TYPES = {
  DEFAULT_LAYOUT,
  DATED_SINGLE_PAGE,
  DATED_WEEK_VIEW,
};

export const HEADER_TYPES = {
  DEFAULT,
  WITH_NAV,
  WEEK_VIEW,
};

export const PAGE_LAYOUT = [
  { type: DEFAULT_LAYOUT, headerType: DEFAULT },
  { type: DATED_SINGLE_PAGE, headerType: WITH_NAV },
  { type: DATED_WEEK_VIEW, headerType: WEEK_VIEW },
];

export const DATED_ENTRY_DIALOG = {
  addTitle: 'Create a Dated Entry',
  editTitle: 'Edit Dated Entry',
  subtitle: 'Please select a date.',
  fields: [
    { key: 'header', title: 'Date', type: 'date' },
  ],
  actions: {
    addButton: 'ADD',
    editButton: 'EDIT',
  },
};

export const COLLECTION_DIALOG = {
  addTitle: 'Create a Collection',
  editTitle: 'Edit Collection',
  subtitle: 'Please enter a header.',
  fields: [
    { key: 'header', title: 'Header', type: 'textField' },
  ],
  actions: {
    addButton: 'ADD',
    editButton: 'EDIT',
  },
};

export const DATE_CONSTRAINTS = {
  MIN_DATE,
  MAX_DATE,
};

export const SEARCH_CONSTRAINTS = {
  NUM_PREVIEW_ITEMS,
};
