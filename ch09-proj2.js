/* add your code here */
document.addEventListener("DOMContentLoaded", () => {

  // Converts the JSON into object
  const paintings = JSON.parse(content);

  const ul = document.querySelector("ul");
  const figure = document.querySelector("figure");
  const h2 = document.querySelector("h2");
  const h3 = document.querySelector("h3");
  const description = document.querySelector("#description");

  for (let painting of paintings) {

    const li = document.createElement("li");
    const img = document.createElement("img");

    const id = painting["id"];
    img.src = "./images/small/" + id + ".jpg";
    img.dataset.id = id;

    li.appendChild(img);
    ul.appendChild(li);
  }

  ul.addEventListener("click", (e) => {
    // e.target is exist and it is one of the <img> element
    if (e.target && e.target.nodeName == "IMG") {
      // Empty the <figure> element
      figure.innerHTML = "";

      const id = e.target.dataset.id;
      const painting = paintings.find(p => p["id"] == id);
      const title = painting["title"];
      const artist = painting["artist"];
      h2.textContent = title;
      h3.textContent = "By " + artist;

      const img = document.createElement("img");
      img.src = "./images/large/" + id + ".jpg";
      figure.appendChild(img);

      // Displays rectangles on top of the painting
      displayRectangles(painting);
    }
  });

  // Displays rectangles on top of the painting
  function displayRectangles(painting) {

    for (let feature of painting["features"]) {
      const rectangle = document.createElement("div");
      rectangle.className = "box";

      // Calculates the width and height of the rectangle
      const width = feature["lowerRight"][0] - feature["upperLeft"][0];
      const height = feature["lowerRight"][1] - feature["upperLeft"][1];

      // Sets the position, left, top, width and height properties
      rectangle.style.position = "absolute";
      rectangle.style.left = feature["upperLeft"][0] + "px";
      rectangle.style.top = feature["upperLeft"][1] + "px";
      rectangle.style.width = width + "px";
      rectangle.style.height = height + "px";

      // Append the rectangle to the <figure> element
      figure.appendChild(rectangle);

      // Sets up event handler of mouseover
      rectangle.addEventListener("mouseover", () => {
        description.textContent = feature["description"];
      });

      // Sets up event handler of mouseout
      rectangle.addEventListener("mouseout", () => {
        description.textContent = "";
      });

    }
  }
});