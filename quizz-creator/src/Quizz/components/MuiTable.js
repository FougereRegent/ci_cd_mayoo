import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import API_URL from "../../config/config.dev";
import DeleteIcon from '@mui/icons-material/Delete';

const DataTable = ({ quizz }) => {
    const navigate = useNavigate();

    const handleRowDoubleClick = (quiz) => {
        fetch(API_URL + "quizz/" + quiz.id)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des données');
                }
                return response.json();
            })
            .then(data => {
                navigate('/view/quizz/' + quiz.id, { state: data });
            })
            .catch(error => {
                console.error('Erreur:', error);
            });
    };

    const handleDelete = (id) => {
        fetch(API_URL + "quizz/" +  id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                if (response.ok) {
                    window.location.reload();
                } else {
                    console.error("Erreur lors de la suppression du quiz");
                }
            })
            .catch(error => {
                console.error("Erreur lors de la communication avec l'API", error);
            });
    };
    const columns = [
        {
            field: "name",
            headerName: "Nom du quiz",
            sortable: false,
            flex: 1,
            minWidth: 500,
        },
        {
            field: "start_date",
            headerName: "Début de parution",
            sortable: false,
            flex: 1,
            minWidth: 100,
            valueFormatter: (params) => format(new Date(params.value), "dd/MM/yyyy"),
        },
        {
            field: "end_date",
            headerName: "Fin de parution",
            sortable: false,
            flex: 1,
            minWidth: 100,
            valueFormatter: (params) => format(new Date(params.value), 'dd/MM/yyyy'),
        },
        {
            field : " ",
            sortable: false,
            flex: 0.5,
            minWidth: 50,
            renderCell: (params) => (
                <DeleteIcon onClick={() => handleDelete(params.row.id)} style={{ cursor: "pointer" }} className="delete-icon" />
            ),
        }
    ];

    return (
        <div style={{height: 400, width: "100%"}}>
            <DataGrid
                rows={quizz}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableColumnMenu
                disableSelectionOnClick
                onRowDoubleClick={handleRowDoubleClick}
            />
        </div>
    );
};

export default DataTable;
