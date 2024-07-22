import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import DeleteIcon from '@mui/icons-material/Delete';

const ManageChannels = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8145/api/v1/manage/channels') // Replace with your API endpoint
      .then(response => {
        console.log("GET API call", response);
        setRows(response.data);
        navigate(`/manage-channels`); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const createHandler = () => {
    console.log("create data");
    navigate(`/manage-channels/create`);
  };

  const updateHandler = (data) => {
    console.log("Update data", data);
    navigate(`/manage-channels/update/${data.channelId}`);
  };

  const deleteHandler = (data) => {
    console.log("Delete data", data);
    axios.delete(`http://localhost:8145/api/v1/manage/channel/${data.channelId}`)
      .then(response => {
        console.log("Delete response", response);
        setRows(rows.filter(row => row.channelId !== data.channelId));
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRows = rows.filter(row => {
    return row.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Paper>
      <Button variant="contained" color="success" onClick={createHandler}>Create New Channel</Button>
      {/* <TextField
        label="Search"
        variant="outlined"
        size="small"
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        style={{ marginBottom: '10px', marginTop: '10px' }}
      /> */}
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="right">ChannelId</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Host</TableCell>
              <TableCell align="right">Port</TableCell>
              <TableCell align="right">SystemId</TableCell>
              <TableCell align="right">Password</TableCell>
              <TableCell align="right">ServiceType</TableCell>
              <TableCell align="right">SourceAddress</TableCell>
              <TableCell align="right">Modified</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.channelId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{row.channelId}</TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.host}</TableCell>
                <TableCell align="right">{row.port}</TableCell>
                <TableCell component="th" scope="row">{row.systemId}</TableCell>
                <TableCell component="th" scope="row">{row.password}</TableCell>
                <TableCell component="th" scope="row">{row.serviceType}</TableCell>
                <TableCell component="th" scope="row">{row.sourceAddress}</TableCell>
                <TableCell component="th" scope="row">{row.modified}</TableCell>
                <TableCell component="th" scope="row">{row.status}</TableCell>
                <TableCell align="right">
                  <Button   onClick={() => updateHandler(row)}><EditIcon /></Button>
                  <Button  onClick={() => deleteHandler(row)}><DeleteIcon /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Paper>
  );
};

export default ManageChannels;
