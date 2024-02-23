import React from "react";
import Table from "./Table";

export default function Mainindex() {
  return (
    <div>
      <h1 className="text-center text-3xl mt-10 font-bold ">
        Library Management System
      </h1>
      <div>
        <Table />
      </div>
    </div>
  );
}
