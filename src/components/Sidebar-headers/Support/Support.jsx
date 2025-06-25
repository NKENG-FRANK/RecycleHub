import React from "react";
import Card from "./Card";
import './Support.css'
export default function Support() {
  const developpers=[
    {
      id: 1,
      name: "EBIMBE EKONGOLO",
      role: "Frontend developper",
      text: "",
      url: "1.png",
      decryption: "nlksdsklcmklsdmkskldklsdmckcdkmdcsmlcdmkcklskldsklmcd"
    },
    {
      id: 1,
      name: "Nindjio Abraham",
      role: "Fullstack developper",
      text: "",
      url: "2.png",
      decryption: "nlksdsklcmklsdmkskldklsdmckcdkmdcsmlcdmkcklskldsklmcd"
    },
    {
      id: 1,
      name: "EBIMBE EKONGOLO",
      role: "Frontend developper",
      text: "",
      url: "3.png",
      decryption: "nlksdsklcmklsdmkskldklsdmckcdkmdcsmlcdmkcklskldsklmcd"
    },
    {
      id: 1,
      name: "EBIMBE EKONGOLO",
      role: "Frontend developper",
      text: "",
      url: "1.png",
      decryption: "nlksdsklcmklsdmkskldklsdmckcdkmdcsmlcdmkcklskldsklmcd"
    },
  ];
  return (
    <div className="support">
      


        <h1>RYCYCLE HUB Developpers</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis nihil molestias deleniti excepturi rerum vitae voluptatem sunt, officiis placeat eaque impedit reiciendis quaerat recusandae enim. Eum cupiditate at illum. Laudantium.</p>
      
        <div>
          <Card/>

        </div>
    </div>
  );
}
