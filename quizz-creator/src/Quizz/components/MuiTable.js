import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "categorie", headerName: "Catégorie", sortable: false, width: 130 },
  {
    field: "name",
    headerName: "Nom du quiz",
    sortable: false,
    flex: 1,
    minWidth: 200,
  },
];

const DataTable = ({ quizz }) => {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={quizz}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnMenu
        disableSelectionOnClick
      />
    </div>
  );
};

export default DataTable;
