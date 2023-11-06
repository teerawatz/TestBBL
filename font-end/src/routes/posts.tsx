import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import { Input as BaseInput, InputProps } from "@mui/base/Input";
import { styled } from "@mui/system";

const Input = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseInput
      slots={{
        root: RootDiv,
        input: "input",
        textarea: TextareaElement,
      }}
      {...props}
      ref={ref}
    />
  );
});

const style = {//style for add post modal
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //width: 1000,
  // height:500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const style2 = {//style for detail post modal
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
  { field: "id", headerName: "ID", width: 100 , align:"center",headerAlign:"center"},
  { field: "title", headerName: "Title", width: 500 },
  { field: "body", headerName: "Body", width: 500 },
];

interface Post {
  id: number;
  userId: string;
  title: string;
  body: string;
}
interface PostDetail {
  id: number;
  userId: string;
  title: string;
  body: string;
  user: any;
}
interface addPost {
  id: number;
  userId: string;
  title: string;
  body: string;
}
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

export default function Posts() {
  const [posts, setPost] = useState<Post[]>([]);
  const [users, setUser] = useState<User[]>([]);
  const [postsdetail, setPostdetail] = useState<PostDetail | undefined>(undefined);
  const [addpost, addPost] = useState<addPost[]>([]);
  const [err, setError] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(true);//open add post modal
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);//open detail post modal
  const handleClose2 = () => setOpen2(false);
  const navigate = useNavigate();
  const [usersel, setUserSel] = React.useState("");

  //select user handle
  const handleChangesel = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setUserSel(event.target.value);
    addPost({
      ...addpost,
      [event.target.name]: value,
    });
  };

  const handleRowClick = async (
    params: any, // GridRowParams
    event: any // MuiEvent<React.MouseEvent<HTMLElement>>
  ) => {
    //console.log(params.row);
    await axios
      .get(`${import.meta.env.VITE_API_URL}/posts/${params.row.id}`)
      .then((response) => {
        if (response.status === 200) {
          setPostdetail(response.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    //console.log(postsdetail);
    handleOpen2();
  };

  //get data posts
  const getData = async () => {
    const url = import.meta.env.VITE_API_URL + "/posts";
    console.log(url);
    await axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          setPost(response.data);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //get data users
  const getDataUser = async () => {
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

  //handel for input post 
  const handleChange = (e: any) => {
    const value = e.target.value;
    addPost({
      ...addpost,
      [e.target.name]: value,
    });
  };
  
  function handleSubmit(e: any) {
    const url = import.meta.env.VITE_API_URL + "/posts";
    e.preventDefault();
    axios
      .post(url,addpost,
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
    window.location.reload();
    //window.location.reload();
  }

  const handleClickDel = (e: any) => {
    const confirmDel = window.confirm(`Are you sure?`);
    if (confirmDel) {
      console.log(postsdetail);
      axios
        .delete(`${import.meta.env.VITE_API_URL}/posts/${postsdetail?.id}`)
        .then((response) => {
          console.log(`Deleted post with ID ${postsdetail?.id}`);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    getData();
    getDataUser();
  }, []);
  //console.log(users);

  return (
    <>
      <div>
        <Button variant="contained" onClick={handleOpen}>
          Add Post
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
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={style}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              New Post As &nbsp;&nbsp;&nbsp;
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Users *</InputLabel>
                <Select
                  required
                  style={{ width: "300px" }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  name="userId"
                  value={usersel}
                  label="User"
                  onChange={handleChangesel}
                >
                  {users.map((row) => (
                    <MenuItem key={row.id} value={row.id}>
                      {row.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Typography>
            <br />
            <Box>
              <div>
                <Input
                  required
                  style={{ height: "2.5rem" }}
                  name="title"
                  onChange={handleChange}
                  aria-label="Demo input"
                  multiline
                  placeholder="Title *"
                />
                <br />
                <Input
                  required
                  style={{ height: "10rem" }}
                  name="body"
                  onChange={handleChange}
                  aria-label="Demo input"
                  multiline
                  placeholder="Body *"
                />
              </div>
              <br />
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
      <div style={{ width: "100%" }}>
        <DataGrid
          onRowClick={handleRowClick}
          rows={posts}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 50]}
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
                <ListSubheader>Title</ListSubheader>
                <ListItem>
                  <ListItemText primary={`${postsdetail?.title}`} />
                </ListItem>
                <br />
                <ListSubheader>Body</ListSubheader>
                <ListItem>
                  <ListItemText primary={`${postsdetail?.body}`} />
                </ListItem>
                <ListSubheader>Post by</ListSubheader>
                <ListItem>
                  <ListItemText
                    primary={`${postsdetail?.user ? postsdetail?.user.name : ""}`}
                  />
                </ListItem>
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

const blue = {
  100: "#DAECFF",
  200: "#80BFFF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const RootDiv = styled("div")`
  display: flex;
  max-width: 100%;
`;

const TextareaElement = styled("textarea", {
  shouldForwardProp: (prop) =>
    !["ownerState", "minRows", "maxRows"].includes(prop.toString()),
})(
  ({ theme }) => `
  width: 500px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5rem;
  padding: 8px 12px;
  border-radius: 8px 8px 0 8px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.5)" : "rgba(0,0,0, 0.05)"
  };

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark" ? blue[700] : blue[200]
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
