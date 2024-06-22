const getThemeFromLocalstorage = () => {
  return localStorage.getItem("theme") || "light";
};

export default getThemeFromLocalstorage;
