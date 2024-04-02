import React, { useEffect, useState } from 'react';
import styles from "./Modular.css";
import { SliderLayout } from "vtex.slider-layout";
import { Block, Link } from "vtex.render-runtime";
import iconos from './iconos.json';
import { ProductSummaryList } from 'vtex.product-summary'

// Genera un arreglo con los nombres de los archivos (sin la extensión)
const iconNames = Object.keys(iconos).map((icon) => icon.replace('.svg', ''));


const Icon = function({nombre}){
    
    return (
        <div className={styles.sliderIcon} dangerouslySetInnerHTML={{ __html: iconos[nombre] }} />
    );
  };

function secureJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return {};
    }
}

// Define el esquema de personalización para el Category Slider
const categorySliderSchema = {
    "title": "Carrusel",
    "type": "object",
    "properties": {
        itemsPerPage: {
           title: 'Elementos por pagina',
           default: '',
           type: 'number',
        },
        generalStyle: {
           title: 'CSS Items',
           default: '',
           type: 'string',
           widget: {
             "ui:widget": "textarea"
           },
        },
        items: {
            type: 'array',
            title: 'Items',
            default: [],
            items: {
                type: 'object',
                title: 'Item',
                properties: {
                    style: {
                       title: 'CSS Item',
                       default: '',
                       type: 'string',
                       widget: {
                         "ui:widget": "textarea"
                       },
                    },
                    icon: {
                        "type": "string",
                        "title": "Icono",
                        "enum": iconNames,
                        "default": "Banners",
                    },
                    link: {
                      type: 'string',
                      title: 'Url'
                    },
                    label: {
                        type: 'string',
                        title: 'Titulo'
                    },
                    tag: {
                        type: 'string',
                        title: 'Tag'
                    },
                }
            }
        }
    }
};

// Componente de Category Slider
const CategorySlider = ({itemsPerPage, items, iconStyle, generalStyle}) => {
    const divIconStyle = secureJsonParse(iconStyle);
    const divGeneralStyle = secureJsonParse(generalStyle);
    if (items && items.length > 0) {
      return (
        <div>
          <SliderLayout
            itemsPerPage={itemsPerPage}
            infinite={true}
            showNavigationArrows={"always"}
            showPaginationDots={"never"}
          >
            {items.map((item, index) => (
              <Link style={{ ...secureJsonParse(generalStyle), ...secureJsonParse(item.style) }} key={index} to={item.link}>
                <div style={divIconStyle} className={styles.iconStyle}>
                    {
                        item.icon != undefined && <Icon nombre={item.icon}/>
                    }
                </div>
                <p className={styles.ECS_categoryLabel}>{item.label}</p>
                <p className={styles.ECS_categoryLabel}>{item.tag}</p>
              </Link>
            ))}
          </SliderLayout>
        </div>
      );
    } else {
      return null;
    }
  };

// Define el esquema de personalización para el HTML
const htmlSchema = {
    "title": "HTML",
    "type": "object",
    "properties": {
        content: {
           title: 'Contenido',
           default: '',
           type: 'string',
           widget: {
             "ui:widget": "textarea"
           },
        }
    }
};
 // Define el esquema de personalización para el listado del banner
 const rowSchema = {
    title: 'Fila',
    type: 'object',
    properties: {
        __editorItemTitle: { // now change name is available
             default: 'Fila',
             title: 'Nombre de fila(Solo editor)',
             type: 'string'
        },
        title: {
          "type": "string",
          "title": "Titulo",
          "default": "" // Título vacío por defecto
        },
        subtitle: {
          "type": "string",
          "title": "Subtitulo",
          "default": "" // Subítulo vacío por defecto
        },
        mobileCol: {
            "type": "number",
            "title": "Columnas Mobile",
            "minimum": 1,
            "maximum": 12,
            "default": 12
        },
        desktopCol: {
            "type": "number",
            "title": "Columnas Desktop",
            "minimum": 1,
            "maximum": 12,
            "default": 12
        },
        style: {
            title: 'CSS Contenedor',
            default: '',
            type: 'string',
            widget: {
              "ui:widget": "textarea"
            },
         },
        rowContent: {
            "type": "string",
            "title": "Tipo de contenido",
            "enum": [
              "Banners",
              "HTML",
              "Slider",
              "Carrusel"
            ],
            "default": "Banners"
        }
    },
    dependencies: {
        rowContent : {
            oneOf: [
                {
                    "properties": {
                        rowContent: {
                            "enum": [
                              "Banners"
                            ],
                        },
                        banners: {
                            type: 'array',
                            title: 'Banners',
                            default: [],
                            items: bannerSchema
                        }
                    }
                },
                {
                    "properties": {
                        rowContent: {
                            "enum": [
                              "HTML"
                            ],
                        },
                        htmlContent: {
                            type: 'object',
                            title: 'Html',
                            default: [],
                            properties: htmlSchema.properties
                        }
                    }
                },
                {
                    "properties": {
                        rowContent: {
                            "enum": [
                              "Slider"
                            ],
                        },
                        slider: {
                            type: 'object',
                            title: 'Categorias',
                            default: [],
                            properties: categorySliderSchema.properties
                        }
                    }
                },
                {
                    "properties": {
                        rowContent: {
                            "enum": [
                              "Carrusel"
                            ],
                        },
                        category: {
                            type: 'string',
                            title: 'Categoria',
                        },
                        collection: {
                            type: 'string',
                            title: 'Coleccion',
                        }
                    }
                },
            ]

        }
    }
};

// Componente de Fila
const Row = ({ ProductSummary, Slider, category, collection, title, subtitle, mobileCol, desktopCol, rowContent, style, banners = [], htmlContent, buttonStyle, slider}) => {
    const divStyle = secureJsonParse(style);
    return (
      <div className={styles["col-" + mobileCol] + " " + styles["col-md-" + desktopCol]}>
        <h2 className={styles.rowTitle}>{title}</h2>
        <h5 className={styles.rowSubitle}>{subtitle}</h5>
        <div className={styles.rowContent} style={divStyle}>
            { rowContent == "Banners" &&
                <div className={styles.bannersContainer}>
                    {banners.map((banner, index) => (
                    <Banner key={index} {...banner}  generalButtonStyle={buttonStyle}/>
                    ))}
                </div>
            }
            { rowContent == "HTML" &&
                <HTML  {...htmlContent} />
            }
            { rowContent == "Slider" &&
                <CategorySlider  {...slider} />
            }
            { rowContent == "Carrusel" &&
                <ProductSummaryList
                category={category}
                collection={collection}
                hideUnavailableItems={true}
                orderBy={"OrderByTopSaleDESC"}
                maxItems={15}
                ProductSummary={ProductSummary}
                >
                    <Slider/>
                </ProductSummaryList>
            }
        </div>
      </div>
    );
  };

Row.schema = rowSchema;

 // Define el esquema de personalización para el listado del banner
 const rowContainerSchema = {
    title: 'Editor Modular',
    type: 'object',
    properties: {
        buttonStyle: {
           title: 'CSS boton',
           default: '',
           type: 'string',
           widget: {
             "ui:widget": "textarea"
           },
        },
        rows: {
          type: 'array',
          title: 'Rows',
          default: [],
          items: rowSchema
        }
    },
 };

// Componente de Fila
const RowContainer = ({ProductSummary, Slider, rows = [], buttonStyle, Carrusel_01,Carrusel_02,Carrusel_03,Carrusel_04,Carrusel_05,Carrusel_06 }) => {
    var carruseles = [Carrusel_01,Carrusel_02,Carrusel_03,Carrusel_04,Carrusel_05,Carrusel_06]
    var cIndex = 0; 
    return (
      <div className={styles.rowContainer}>
        <div className={styles.container}>
        {rows.map((row, index) => (
          <Row key={index} {...row} ProductSummary={ProductSummary} Slider={Slider} Carrusel={(row.rowContent == "Carrusel" && carruseles[cIndex] != undefined) ? carruseles[cIndex++] : null} buttonStyle={buttonStyle}/>
        ))}
        </div>
      </div>
    );
};

RowContainer.schema = rowContainerSchema;

export default RowContainer;