import React from 'react';

// Define el esquema de personalización para el grupo
const groupSchema = {
  "title": "Group",
  "type": "object",
  "properties": {
    "backgroundColor": {
      "type": "string",
      "title": "Background Color",
      "default": "#ffffff" // Color blanco por defecto
    },
    "width": {
      "type": "string",
      "title": "Width Percentage",
      "default": "100%" // Ancho del 100% por defecto
    },
    "height": {
      "type": "number",
      "title": "Height (px)",
      "default": 100 // Altura de 100px por defecto
    },
    "flexDirection": {
      "type": "string",
      "title": "Flex Direction",
      "enum": ["row", "column"],
      "default": "row" // Dirección de fila por defecto
    },
    "groups": {
      "type": "array",
      "title": "Groups",
      "items": { "$ref": "#/definitions/group" }
    }
  },
  "definitions": {
    "group": {
      "type": "object",
      "properties": {
        "backgroundColor": { "type": "string" },
        "width": { "type": "string" },
        "height": { "type": "number" },
        "flexDirection": { "type": "string" },
        "groups": {
          "type": "array",
          "title": "Groups",
          "items": { "$ref": "#/definitions/group" }
        }
      }
    }
  }
};

// Componente de Grupo
const Group = ({ backgroundColor = "#ffffff", width = "100%", height = 100, flexDirection = "row", groups = [] }) => {
  return (
    <div className="group" style={{ backgroundColor, width, height: `${height}px`, display: 'flex', flexDirection }}>
      {groups.map((subGroup, index) => (
        <Group key={index} {...subGroup} />
      ))}
    </div>
  );
}

// Añade el esquema al componente de grupo
Group.schema = groupSchema;

export default Group;