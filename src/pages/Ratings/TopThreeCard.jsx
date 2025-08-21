import "./Ratings.css";
export default function TopThreeCard({name,logoPic}) {
  return (
    <>
      <div className="logo common_all">
        <img src={`data:image/jpeg;base64,${logoPic}`} class="card-img-top " alt="..." />
      </div>
      <div class="display-6 fw-lighter fs-4 bg-light w-100 p-2">
        {name}
      </div>
      {/* <p className="bg-light w-100 d-flex justify-content-center p-2">⭐⭐⭐⭐</p> */}
    </>
  );
}
