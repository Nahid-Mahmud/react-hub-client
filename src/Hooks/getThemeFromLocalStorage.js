// get theme data from local storage

export const getThemeFromLocalStoragae = () => {
    return localStorage.getItem("_theme") || "light"; // if _theme item not found it will return "light" as default value
  };
  