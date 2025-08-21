import { useEffect } from "react";
import "./GlobalJobs.css";

export default function Carsoul({ imageArray }) {

  return (
    
    <div
      id="carouselExampleSlidesOnly"
      class="carousel slide "
      data-bs-ride="carousel"
    >
      <div class="carousel-inner ">
        {imageArray.map((image,index) => {
          return (
            <div  className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img
                src={image.img}
                class="d-block w-100"
                alt="..."
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

