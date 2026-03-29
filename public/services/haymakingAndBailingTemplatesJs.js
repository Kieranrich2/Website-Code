
window.loadTemplates = async function(templateIds, containerId) {
  const container = document.querySelector(`#${containerId}`);

  if (!container) {
    console.error(`Container with selector "#${containerId}" not found.`);
    return;
  }

  try {
    const response = await fetch("hayMakingAndBailingEquipmentTemplates.html");
    const html = await response.text();
    const parser = new DOMParser();
    const templateDoc = parser.parseFromString(html, "text/html");

    templateIds.forEach(id => {
      const template = templateDoc.querySelector(`#${id}`);
      if (template && template.content) {
        container.appendChild(document.importNode(template.content, true));
      } else {
        console.warn(`Template with selector "#${id}" was not found.`);
      }
    });
  } catch (error) {
    console.error("Error loading templates:", error);
  }
};