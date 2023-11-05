import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  // height:500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const style2 = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  //height: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 300 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "phone", headerName: "Phone", width: 250 },
];

interface User {
  id: number;
  name: string;
  username: string;
  phone: string;
  email: string;
  website: string;
  address: any;
  company: any;
}
interface Usersdetail {
  id: number;
  name: string | undefined;
  username: string;
  phone: string;
  email: string;
  website: string;
  address: any;
  company: any;
}
interface addUser {
  name: string;
  username: string;
  phone: string;
  email: string;
  website: string;
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
  companyName: string;
  catchPhrase: string;
  bs: string;
}

// const [users,setUser] = useState<User[]>([])
// const [err,setError] = useState([])
//useEffect(() => {

//.then(res => setUser(res))
//. catch(err => setError(err))
//}, [])
// console.log(users);
// console.log(err);

export default function Users() {
  const [users, setUser] = useState<User[]>([]);
  const [usersdetail, setUserdetail] = useState<Usersdetail[]>([]);
  const [adduser, addUser] = useState<addUser[]>([]);
  const [err, setError] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const navigate = useNavigate();
  const handleRowClick = (
    params: any, // GridRowParams
    event: any // MuiEvent<React.MouseEvent<HTMLElement>>
  ) => {
    //console.log(params.row);
    setUserdetail(params.row);
    console.log(usersdetail);
    handleOpen2();
  };

  const getData = async () => {
    await axios
      .get(`${import.meta.env.VITE_API_URL}/users`)
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleChange = (e: any) => {
    const value = e.target.value;
    addUser({
      ...adduser,
      [e.target.name]: value,
    });
  };
  function handleSubmit(e: any) {
    const url = import.meta.env.VITE_API_URL + "/users";
    e.preventDefault();
    axios
      .post(url, adduser, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload();
    // window.location.reload();
    //navigate('/users');
  }

  const handleClickDel = (e: any) => {
    const confirmDel = window.confirm(`Are you sure?`);
    if (confirmDel) {
      console.log(usersdetail);
      axios
        .delete(`${import.meta.env.VITE_API_URL}/users/${usersdetail.id}`)
        .then((response) => {
          console.log(`Deleted post with ID ${usersdetail.id}`);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getData();
    //users.btn = '<Button variant="contained">Contained</Button>'
  }, []);
  //console.log(users);

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleOpen}>
          Add user
        </Button>
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add user
            </Typography>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Name"
                  name="name"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Username"
                  name="username"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="E-mail"
                  name="email"
                  defaultValue=""
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Address
                </Typography>
              </div>
              <div>
                <TextField
                  id="outlined-required"
                  label="Street"
                  name="street"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-required"
                  label="Suite"
                  name="suite"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="City"
                  name="city"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Zipcode"
                  name="zipcode"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Lat"
                  name="lat"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Long"
                  name="lng"
                  defaultValue=""
                  onChange={handleChange}
                />
              </div>
              <br />
              <div>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Contact
                </Typography>
              </div>
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Phone"
                  defaultValue=""
                  name="phone"
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Website"
                  name="website"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Company"
                  name="companyName"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-required"
                  label="catchPhrase"
                  name="catchPhrase"
                  defaultValue=""
                  onChange={handleChange}
                />
                <TextField
                  id="outlined-required"
                  label="bs"
                  name="bs"
                  defaultValue=""
                  onChange={handleChange}
                />
              </div>
              <Box
                component="span"
                m={1}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button variant="outlined" color="error" onClick={handleClose}>
                  close
                </Button>
                <Button variant="contained" color="success" type="submit">
                  save
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          onRowClick={handleRowClick}
          rows={users}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // onRowSelectionModelChange={(newSelectionModel: any) => {

          //   console.log(newSelectionModel)
          //   handleOpen2();
          // }}
        />
      </div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style2}>
          <List
            sx={{
              width: "100%",
              //maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              //maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            <li>
              <ul>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <ListSubheader>User</ListSubheader>
                    <ListItem>
                      <ListItemText primary={`Name : ${usersdetail.name}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Username : ${usersdetail.username}`}
                      />
                    </ListItem>
                    <ListSubheader>Contact</ListSubheader>
                    <ListItem>
                      <ListItemText primary={`Email : ${usersdetail.email}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Phone : ${usersdetail.phone}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Website : ${usersdetail.website}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Campany : ${
                          usersdetail.company ? usersdetail.company[0].name : ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`catchPhrase : ${
                          usersdetail.company
                            ? usersdetail.company[0].catchPhrase
                            : ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`bs : ${
                          usersdetail.company ? usersdetail.company[0].bs : ""
                        }`}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ListSubheader>Address</ListSubheader>
                    <ListItem>
                      <ListItemText
                        primary={`Street : ${
                          usersdetail.address
                            ? usersdetail.address[0].street
                            : ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Suite : ${
                          usersdetail.address
                            ? usersdetail.address[0].suite
                            : ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`City : ${
                          usersdetail.address ? usersdetail.address[0].city : ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Zipcode : ${
                          usersdetail.address
                            ? usersdetail.address[0].zipcode
                            : ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`location : ${
                          usersdetail.address
                            ? usersdetail.address[0].geo[0].lat
                            : ""
                        } , ${
                          usersdetail.address
                            ? usersdetail.address[0].geo[0].lng
                            : ""
                        }`}
                      />
                    </ListItem>
                  </Grid>
                </Grid>
              </ul>
            </li>
          </List>
          <Box
            component="span"
            m={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button variant="contained" color="error" onClick={handleClickDel}>
              Delete
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose2}>
              close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
