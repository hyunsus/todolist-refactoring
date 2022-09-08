/**
 * Local Storage Helper Util
 */

export default {
  getJsonObject(key) {
    const ls = window.localStorage;
    if (ls) {
      const str = ls.getItem(key);
      try {
        return JSON.parse(str);
      } catch (e) {
        console.error('Json Parse Error');
        return null;
      }
    } else {
      console.error('LocalStorage not supported');
    }
    return null;
  },

  setJsonObject(key, object) {
    const ls = window.localStorage;
    if (ls) {
      const str = JSON.stringify(object);
      ls.setItem(key, str);
    } else {
      console.error('LocalStorage not supported');
    }
    return null;
  },
};
