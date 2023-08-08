const layoutTypes = {
  HORIZONTAL: "horizontal",
  VERTICAL: "vertical",
  TWOCOLUMN: "twocolumn",
  SEMIBOX: "semibox",
};

const layoutModeTypes = {
  LIGHTMODE: "light",
  DARKMODE: "dark",
};

const leftSidebarTypes = {
  LIGHT: "light",
  DARK: "dark",
  GRADIENT: "gradient",
  GRADIENT_2: "gradient-2",
  GRADIENT_3: "gradient-3",
  GRADIENT_4: "gradient-4",
};

const layoutWidthTypes = {
  FLUID: "lg",
  BOXED: "boxed",
};

const layoutPositionTypes = {
  FIXED: "fixed",
  SCROLLABLE: "scrollable",
};

const topbarThemeTypes = {
  LIGHT: "light",
  DARK: "dark",
};

const leftsidbarSizeTypes = {
  DEFAULT: "lg",
  COMPACT: "md",
  SMALLICON: "sm",
  SMALLHOVER: "sm-hover",
};

const leftSidebarViewTypes = {
  DEFAULT: "default",
  DETACHED: "detached",
};

const leftSidebarImageTypes = {
  NONE: "none",
  IMG1: "img-1",
  IMG2: "img-2",
  IMG3: "img-3",
  IMG4: "img-4",
};

const preloaderTypes = {
  ENABLE: "enable",
  DISABLE: "disable",
};

const backgroundImageTypes = {
  NONE: "none",
  IMG1: "img-1",
  IMG2: "img-2",
  IMG3: "img-3",
};

const sidebarVisibilitytypes = {
  SHOW: "show",
  HIDDEN: "hidden",
};

/******************************** APP CONSTANTS ***********************************/

export const RECEIPT_STATUSES = [
  { value: 0, label: "New" },
  { value: 1, label: "Approved" },
  { value: 2, label: "Rejected" },
];

export const getReceiptStatusById = (id) => {
  return RECEIPT_STATUSES.find((s) => s.value == id);
};
export const getReceiptStatusByValue = (val) => {
  let tempVal = val && val.trim().toLowerCase();
  return RECEIPT_STATUSES.find((s) => s.label.trim().toLowerCase() === tempVal);
};
/******************************** APP CONSTANTS ***********************************/

export {
  layoutTypes,
  layoutModeTypes,
  leftSidebarTypes,
  layoutWidthTypes,
  layoutPositionTypes,
  topbarThemeTypes,
  leftsidbarSizeTypes,
  leftSidebarViewTypes,
  leftSidebarImageTypes,
  preloaderTypes,
  backgroundImageTypes,
  sidebarVisibilitytypes,
};
