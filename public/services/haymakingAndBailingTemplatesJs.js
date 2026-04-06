
window.loadTemplates = async function(templateIds, containerId) {
  const container = document.querySelector(`#${containerId}`); // Finds the container to put the templates in

  if (!container) { 
    console.error(`Container with selector "#${containerId}" not found.`);
    return;
  } // Error handeling if the container is not found

  try {
    // Fetches the HTML file containing the templates
    const response = await fetch("hayMakingAndBailingEquipmentTemplates.html");
    // Converts the response to text
    const html = await response.text();
    // Parses the HTML string into a document
    const parser = new DOMParser();
    const templateDoc = parser.parseFromString(html, "text/html");

    templateIds.forEach(id => {
      // Locates the templates needed by their ID
      const template = templateDoc.querySelector(`#${id}`);
      if (template && template.content) {
        // Clone the template and add it to the container 
        container.appendChild(document.importNode(template.content, true));
      } else {
        console.warn(`Template with selector "#${id}" was not found.`);
      }
    });
  } catch (error) {
    console.error("Error loading templates:", error);
  }
};