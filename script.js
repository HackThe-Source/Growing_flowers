const garden = document.querySelector(".garden-container");

const COLORS = [
  "#ffd1dc",
  "#ffffff",
  "#c7ecee",
  "#ffe4e1",
  "#f8a5c2"
];

/* CREATE STARS */

for(let i=0;i<150;i++){

  const star = document.createElement("div");

  star.classList.add("star");

  const size = Math.random()*2+1;

  star.style.left = Math.random()*100 + "%";
  star.style.top = Math.random()*100 + "%";

  star.style.width = size + "px";
  star.style.height = size + "px";

  star.style.opacity = Math.random()*0.5 + 0.3;

  star.style.setProperty(
    "--duration",
    Math.random()*3 + 2 + "s"
  );

  garden.appendChild(star);
}

/* FLOWERS */

garden.addEventListener("click",(e)=>{

  document.querySelector(".hint-text").style.display="none";

  const color =
    COLORS[Math.floor(Math.random()*COLORS.length)];

  const height =
    Math.random()*150 + 150;

  const curve =
    (Math.random()-0.5)*120;

  const rotation =
    Math.random()*360;

  const flip =
    Math.random()>0.5;

  const wrapper = document.createElement("div");

  wrapper.classList.add("flower-wrapper");

  const svgWidth =
    Math.max(Math.abs(curve)*2+60,100);

  const startX = svgWidth/2;
  const endX = startX + curve;

  wrapper.style.left =
    e.clientX - startX + "px";

  wrapper.style.bottom =
    window.innerHeight - e.clientY + "px";

  wrapper.style.width = svgWidth + "px";
  wrapper.style.height = height + "px";

  wrapper.innerHTML = `

    <svg width="${svgWidth}" height="${height}" class="flower-svg">

      <path
        d="M ${startX} ${height}
           Q ${startX} ${height/2}
           ${endX} 0"
        class="stem-path"
      />

      <path
        d="
          M ${startX + curve*0.25} ${height*0.75}
          Q ${startX + curve*0.25 + (flip ? 25 : -25)} ${height*0.75 - 15}
          ${startX + curve*0.25 + (flip ? 35 : -35)} ${height*0.75 - 35}
          Q ${startX + curve*0.25 + (flip ? 10 : -10)} ${height*0.75 - 25}
          ${startX + curve*0.25} ${height*0.75}
        "
        class="leaf-path"
        style="animation-delay:0.4s"
      />

      <path
        d="
          M ${startX + curve*0.6} ${height*0.4}
          Q ${startX + curve*0.6 + (flip ? -20 : 20)} ${height*0.4 - 10}
          ${startX + curve*0.6 + (flip ? -30 : 30)} ${height*0.4 - 30}
          Q ${startX + curve*0.6 + (flip ? -10 : 10)} ${height*0.4 - 20}
          ${startX + curve*0.6} ${height*0.4}
        "
        class="leaf-path"
        style="animation-delay:0.7s"
      />

    </svg>

    <div
      class="flower-head"
      style="
        left:${endX}px;
        top:0;
        transform:translate(-50%,-50%) scale(0) rotate(${rotation}deg);
      "
    >

      <div class="petal-container">

        ${[...Array(8)].map((_,i)=>`
          <div
            class="petal"
            style="
              background:${color};
              box-shadow:
                0 0 15px ${color},
                inset 0 0 10px rgba(255,255,255,0.6);

              transform:
                translate(-50%,-100%)
                rotate(${i*45}deg)
                translateY(-4px);
            "
          ></div>
        `).join("")}

      </div>

      <div class="flower-center"></div>

    </div>
  `;

  garden.appendChild(wrapper);

});
