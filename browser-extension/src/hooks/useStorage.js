export const getData = (key) => {
  return new Promise((resolve) => {
    if (!chrome?.storage?.local) {
      const data = localStorage.getItem(key);
      resolve(data ? JSON.parse(data) : null);
      return;
    }

    chrome.storage.local.get([key], (result) => {
      resolve(result[key]);
    });
  });
};

export const setData = (key, value) => {
  return new Promise((resolve) => {
    if (!chrome?.storage?.local) {
      localStorage.setItem(key, JSON.stringify(value));
      resolve();
      return;
    }

    chrome.storage.local.set({ [key]: value }, () => {
      resolve();
    });
  });
};