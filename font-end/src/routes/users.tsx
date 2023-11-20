import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridRow, GridValueGetterParams } from "@mui/x-data-grid";
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
  { field: "id", headerName: "ID", width: 100, align:"center",headerAlign:"center"},
  { field: "name", headerName: "Name", width: 250 },
  { field: "username", headerName: "Username", width: 200 },
  { field: "phone", headerName: "Phone", width: 300 },
  { field: "email", headerName: "Email", width: 300 },
];


export default function Users() {
  const [users, setUser] = useState<User[]>([]);
  const [usersdetail, setUserdetail] = useState<Usersdetail | undefined>(undefined);
  const [adduser, addUser] = useState<addUser[]>([]);
  const [err, setError] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const handleRowClick = (
    params: any, // GridRowParams
    event: any, // MuiEvent<React.MouseEvent<HTMLElement>>
  ) => {
    //console.log(params.row);
    setUserdetail(params.row);
   // console.log(usersdetail);
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
      .post(url, adduser, 
        {
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
      //console.log(usersdetail);
      axios
        .delete(`${import.meta.env.VITE_API_URL}/users/${usersdetail?.id}`)
        .then((response) => {
          console.log(`Deleted post with ID ${usersdetail?.id}`);
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
      <br/>
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
                <Button variant="contained" color="primary" onClick={handleClose}>
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
      <div style={{  width: "100%" }}>
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
        open={usersdetail!=undefined}
        onClose={() => setUserdetail(undefined)}
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
                      <ListItemText primary={`Name : ${usersdetail?.name??""}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Username : ${usersdetail?.username??""}`}
                      />
                    </ListItem>
                    <ListSubheader>Contact</ListSubheader>
                    <ListItem>
                      <ListItemText primary={`Email : ${usersdetail?.email??""}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary={`Phone : ${usersdetail?.phone??""}`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Website : ${usersdetail?.website??""}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Campany : ${
                          (usersdetail?.company && usersdetail?.company.name )?usersdetail?.company.name: ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`catchPhrase : ${
                          (usersdetail?.company && usersdetail?.company.catchPhrase )?usersdetail?.company.catchPhrase: ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`bs : ${
                          (usersdetail?.company && usersdetail?.company.bs )?usersdetail?.company.bs: ""
                        }`}
                      />
                    </ListItem>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ListSubheader>Address</ListSubheader>
                    <ListItem>
                      <ListItemText
                        primary={`Street : ${
                            (usersdetail?.address && usersdetail?.address.street )?usersdetail?.address.street: ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Suite : ${
                            (usersdetail?.address && usersdetail?.address.suite )?usersdetail?.address.suite: ""
                        }`}
                      />
                    </ListItem>
                    <ListItem> 
                      <ListItemText
                        primary={`City : ${
                          (usersdetail?.address && usersdetail?.address.city )?usersdetail?.address.city: ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`Zipcode : ${
                            (usersdetail?.address && usersdetail?.address.zipcode )?usersdetail?.address.zipcode: ""
                        }`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary={`location : ${
                            (usersdetail?.address && usersdetail?.address.geo.lat )?usersdetail?.address.geo.lat: "-"
                        } , ${
                            (usersdetail?.address && usersdetail?.address.geo.lng )?usersdetail?.address.geo.lng: "-"
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
            <Button variant="contained" color="primary" onClick={() => setUserdetail(undefined)}>
              close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
