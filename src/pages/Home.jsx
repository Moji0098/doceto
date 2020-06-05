import React from "react";

function Home(props) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        onClick={() => props.history.push("/search/speciality")}
        className="go-to-filter"
      >
        برو به جستجو
      </div>
    </div>
  );
}

export default Home;
