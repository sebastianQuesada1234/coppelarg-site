import React from "react";
import { Link } from "vtex.render-runtime";

import styles from "./EventoBanners.css";

const EventoBanners = (props) => {
  if (props.items && props.items.length > 0) {
    return (
      <div className={styles.EB_container}>
        {props.items.map((item, index) => (
          <div className={styles.EB_item_container+" "+styles[props.class]}>
            {item.link !== "" ? (
              <Link className={`${styles.EB_item} ${styles.EB_link}`} to={item.link}>
                <img className={styles.EB_img} src={item.banner} alt="Banner" />
                <h3 className={styles.EB_title}>{item.title}</h3>
                <p className={styles.EB_description}>{item.description}</p>
                <p className={styles.EB_more}>Ver mas</p>
              </Link>
            ) : (
              <div className={styles.EB_item}>
                <img className={styles.EB_img} src={item.banner} alt="Banner" />
                <h3 className={styles.EB_title}>{item.title}</h3>
                <p className={styles.EB_description}>{item.description}</p>
                <p className={styles.EB_more}>Ver mas</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return <React.Fragment />;
  }
};

EventoBanners.schema = {
  title: "Evento Category Slider"
};

export default EventoBanners;
