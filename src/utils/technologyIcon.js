// Technology icon
export function technologyIcon(iconName, version = "original") {
  const baseUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons`;
  const replacedIcon = iconName.toLowerCase();
  // replace white spaces and ++ sequence
  // const replacedIcon = iconName
  //   .replace(/\s+/g, "") //whitespace
  //   .replace(/-/g, "") // -
  //   .replace(/./g, "") // .
  //   .replace(/\+\+/g, "plusplus") // ++ pattern
  //   .replace(/#/g, "sharp") // #
  //   // .replace(/js+$/i, "") // js at the end
  //   .toLowerCase();
  const iconUrl = `${baseUrl}/${iconName}/${iconName}-original.svg`;
  // return iconUrl;
  return `${baseUrl}/${replacedIcon}/${replacedIcon}-original.svg`;
}
