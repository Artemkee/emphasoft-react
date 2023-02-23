export const getFromSessionStorage = (key) => (
    sessionStorage.getItem(key)
  );

export const setToSessionStorage = (key, value) => (
  sessionStorage.setItem(key, value)
);

export const translateField = (value) => {
  switch (value) {
    case true:
      return 'yes';
    case false:
      return 'no';
  }
}
