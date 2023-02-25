import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Dialog, DialogContent, Button, DialogTitle } from "@mui/material";
import { ClockLoader } from "react-spinners";

import axios from "axios";

function TeamMembersModal({ open, handleClose, teamId, teamName }) {
  const [loading, setLoading] = useState(true);
  const [participants, setParticipants] = useState([]);

  const getParticipantsByTeam = async () => {
    const response = await axios.get(`/api/teams/${teamId}`);
    setParticipants(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getParticipantsByTeam();
  }, [teamId]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "col1", headerName: "Name", width: 200 },
    { field: "col2", headerName: "Email", width: 300 },
    { field: "col3", headerName: "College", width: 500 },
    { field: "col4", headerName: "Year", width: 100 },
    {
      field: "col5",
      headerName: "Linkedin",

      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.open(params.value);
          }}
        >
          Linkedin
        </Button>
      ),
      width: 150,
    },
    {
      field: "col6",
      headerName: "Github",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.open(params.value);
          }}
        >
          Github
        </Button>
      ),
      width: 150,
    },
    {
      field: "col7",
      headerName: "Devfolio",
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            window.open(params.value);
          }}
        >
          Devfolio
        </Button>
      ),
      width: 150,
    },
  ];

  const rows = participants.map((participant) => {
    return {
      id: participant.id,
      col1: participant.name,
      col2: participant.email,
      col3: participant.institutionName,
      col4: participant.gradYear,
      col5: participant.linkedin,
      col6: participant.github,
      col7: participant.devfolio,
    };
  });

  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          borderRadius: "1rem",
          padding: "1rem",
        },
      }}
      BackdropProps={{
        style: {
          opacity: 0.5,
        },
      }}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="lg"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          textAlign: "center",
        }}
      >
        <b>{teamName}</b> Team Members
      </DialogTitle>
      <DialogContent sx={{ "&::-webkit-scrollbar": { display: "none" } }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <ClockLoader color="#3f51b5" size={100} />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              height: "100%",
              flexGrow: 1,
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={rows.map((row) => {
                  return {
                    ...row,
                  };
                })}
                columns={columns}
                components={{
                  Toolbar: GridToolbar,
                }}
                componentsProps={{
                  toolbar: {
                    showQuickFilter: true,

                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                autoHeight
              />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TeamMembersModal;