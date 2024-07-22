import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Tab,
  Box,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination
} from '@mui/material';
import { Search } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import axios from 'axios';

const ViewMessages = () => {
  const [value, setValue] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get('status') || '';

  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!!",queryParam)
    if (searchQuery) {
      fetchData(searchQuery, value);
    } else if (queryParam) {
      console.log("!@!#########",value)
      fetchData(queryParam, value);
    }
  }, [searchQuery, queryParam, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const fetchData = async (query, tab) => {
    try {
      let url;
      if (tab === '1') {
        url = `http://localhost:8145/api/v1/manage/messages/query/status/${query}`;
      } else if (tab === '2') {
        url = `http://localhost:8145/api/v1/manage/messages/query/msisdn/${query}`;
      } else if (tab === '3') {
        url = `http://localhost:8145/api/v1/manage/messages/query/channel/${query}`;
      }
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Query By Status" value="1" />
            <Tab label="Query By MSISDN" value="2" />
            <Tab label="Query By Channel" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Search sx={{ mr: 1 }} />
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">MSISDN</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Channel</TableCell>
                  <TableCell align="right">Content</TableCell>
                  <TableCell align="right">Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.msisdn}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.channel}</TableCell>
                    <TableCell align="right">{row.content}</TableCell>
                    <TableCell align="right">{new Date(row.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>
        <TabPanel value="2">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Search sx={{ mr: 1 }} />
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">MSISDN</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Channel</TableCell>
                  <TableCell align="right">Content</TableCell>
                  <TableCell align="right">Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.msisdn}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.channel}</TableCell>
                    <TableCell align="right">{row.content}</TableCell>
                    <TableCell align="right">{new Date(row.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>
        <TabPanel value="3">
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Search sx={{ mr: 1 }} />
            <TextField
              variant="outlined"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">MSISDN</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right">Channel</TableCell>
                  <TableCell align="right">Content</TableCell>
                  <TableCell align="right">Timestamp</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="right">{row.msisdn}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                    <TableCell align="right">{row.channel}</TableCell>
                    <TableCell align="right">{row.content}</TableCell>
                    <TableCell align="right">{new Date(row.timestamp).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default ViewMessages;
