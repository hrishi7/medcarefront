import React, { Component } from "react";
import PropTypes from "prop-types";
import FormData from "form-data";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  withStyles,
  Grid,
  Avatar,
  Input,
  Chip,
  TextField,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Paper,
  Fab,
  Tooltip,
  MenuItem,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TableFooter
} from "@material-ui/core";
import { DoneOutline, ClearAll, DeleteForever } from "@material-ui/icons/";
// import MySnackbar from "../Components/MySnackbar";
// import Progress from "./Progress";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";

const styles = theme => ({
  grow: {
    flexGrow: 1
  },
  entryArea: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(),
    padding: theme.spacing(2),
    paddingTop: 0,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "95%"
  },
  chip: {
    marginTop: theme.spacing()
  },
  actionButton: {
    marginTop: theme.spacing(3)
  },
  button: {
    margin: theme.spacing(2)
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#2196F3", 0.15),
    "&:hover": {
      backgroundColor: fade("#2196F3", 0.35)
    },
    margin: 10,
    width: "100%",
    [theme.breakpoints.up("xs")]: {
      marginLeft: theme.spacing(),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(8),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    display: "flex",
    padding: 0
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  searchResult: {
    margin: 10
  }
});

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "Toumosin MT plus",
      subheader: "September 20, 2019",
      brandLogo: "https://avatars0.githubusercontent.com/u/36503061?s=460&v=4",
      img: "https://www.netmeds.com/pub/media/aw_rbslider/slides/Dabur-Ehticals_3-_450px__4.jpg",
      category: "",
      desc: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
      sellingPrice: "150",
      discount: "10",

      loading: false,
      allProducts: [],
      page: 0,
      rowsPerPage: 10
    };
  }
  componentDidMount() {
    this.getProduct("");
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  fileUpload = async (e, name) => {
    if (e) {
      this.setState({ loading: true });
      if (name === "document") {
        const selectedFile = e;
        const data = new FormData();
        data.append("photo", selectedFile, selectedFile.name);
        await axios
          .post(`/api/other/fileupload/upload`, data, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${data._boundary}`
            }
          })
          .then(res =>
            this.setState(prevState => ({
              documents: [
                { name: selectedFile.name, url: res.data.result.secure_url, format: res.data.result.format, size: res.data.result.bytes, public_id: res.data.result.public_id },
                ...prevState.documents
              ],
              loading: false
            }))
          )
          .catch(err => console.log(err));
      } else if (name === "userImage") {
        this.setState({
          selectedUserImg: e
        });
        let reader = new FileReader();
        let file = e;
        reader.onloadend = () => {
          this.setState({
            userImage: reader.result
          });
        };
        file && reader.readAsDataURL(file);
        const data = new FormData();
        data.append("photo", file, file.name);
        await axios
          .post(`/api/other/fileupload/upload`, data, {
            headers: {
              accept: "application/json",
              "Accept-Language": "en-US,en;q=0.8",
              "Content-Type": `multipart/form-data; boundary=${data._boundary}`
            }
          })
          .then(res => this.setState({ userImage: res.data.result.secure_url, loading: false }))
          .catch(err => console.log(err));
      }
    }
  };
  handleSave = () => {
    this.setState({ loading: true });
    let newUser = {
      _id: this.state._id
    };
    axios
      .post(`/api/auth/register/${this.state._id}`, newUser)
      .then(res => {
        // this.child.handleSnackbar(res.data);
        this.handleClear();
      })
      .then(() => this.setState({}, () => this.getProduct("")))
      .catch(err => console.log(err));
  };

  handleClear = () => {
    this.setState({
      _id: "",

      loading: false
    });
  };

  handleDelete = (id, cloudId, i) => {
    if (cloudId) {
      if (id) {
        this.setState({ loading: true });
        axios
          .post("/api/other/fileupload/delete", { public_id: cloudId })
          //   .then(res => this.child.handleSnackbar(res.data))
          .then(() =>
            this.setState(
              prevState => ({
                documents: [...prevState.documents.splice(i, i + 1)]
              }),
              () => this.handleSave()
            )
          )
          .catch(err => console.log(err));
      } else {
        axios
          .post("/api/other/fileupload/delete", { public_id: cloudId })
          //   .then(res => this.child.handleSnackbar(res.data))
          .catch(err => console.log(err));
      }
    } else {
      this.setState({ loading: true });
      let route = "/api/auth/deleteuser/";
      route += id;
      axios
        .delete(route)
        // .then(res => this.child.handleSnackbar(res.data))
        .then(() => this.setState({}, () => this.getProduct("")))
        .catch(err => console.log(err));
      this.handleClear();
    }
  };
  getProduct = word => {
    this.setState({ loading: true });
    let route = "/api/auth/person/";
    route += word;
    axios
      .get(route)
      .then(res => this.setState({ allUsers: res.data, loading: false }))
      .catch(err => console.log(err));
  };

  setUserData = id => {
    this.setState({ loading: true });
    let route = "/api/auth/get/";
    route += id;
    axios
      .get(route)
      .then(res => {
        this.setState({
          _id: res.data[0]._id,
          loading: false
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    return (
      <section>
        <Grid container>
          <Grid item xs={12} md={12} lg={9}>
            <Paper className={classes.entryArea}>
              <Grid container spacing={2}>
                <Grid item xs={4} />
                <Grid item xs={4}>
                  <center>
                    <Chip color="primary" label="Add Product" className={classes.chip} />
                  </center>
                </Grid>
                <Grid item xs={4} />
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Title of product" placeholder="Title..." value={this.state.title} onChange={this.handleChange("title")} required autoFocus fullWidth />
                    <TextField select label="Category" fullWidth value={this.state.category} onChange={this.handleChange("category")}>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Worker">Worker</MenuItem>
                      <MenuItem value="Guest">Guest Member </MenuItem>
                      <MenuItem value="Family">Family member</MenuItem>
                    </TextField>
                    <TextField label="Sub Title" placeholder="Title..." value={this.state.subheader} onChange={this.handleChange("subheader")} required fullWidth />
                    <TextField
                      label="Brand Logo"
                      // value={this.state.brandLogo}
                      type="file"
                      onChange={e => this.fileUpload(e.target.files[0], "brandLogo")}
                      required
                      fullWidth
                    />
                    <TextField
                      label="Product Image"
                      type="file"
                      // value={this.state.img}
                      onChange={e => this.fileUpload(e.target.files[0], "img")}
                      required
                      fullWidth
                    />
                    <TextField label="Description" value={this.state.desc} onChange={this.handleChange("desc")} required fullWidth />
                    <TextField label="Selling Price" value={this.state.sellingPrice} type="number" onChange={this.handleChange("sellingPrice")} required fullWidth />
                    <TextField label="Discount" maxLength="2" value={this.state.discount} type="number" onChange={this.handleChange("discount")} required fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                      <CardHeader
                        avatar={<Avatar aria-label="recipe" src={this.state.brandLogo} className={classes.avatar}></Avatar>}
                        action={
                          <IconButton color="secondary" aria-label="settings">
                            {/* <FaCartPlus /> */}
                          </IconButton>
                        }
                        title={this.state.title}
                        subheader={this.state.subheader}
                      />
                      <CardMedia className={classes.media} image={this.state.img} title={this.state.title} />
                      <CardContent>
                        <Typography variant="body2" color="textSecondary" paragraph>
                          {this.state.desc}
                        </Typography>
                        <CardActions disableSpacing>
                          <Chip color="primary" label={`₹ ${this.state.sellingPrice}`} />
                          <div className={classes.grow} />
                          <Typography color="secondary" align="right">
                            {`${this.state.discount} % Off`}
                          </Typography>
                        </CardActions>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Grid container className={classes.actionButton}>
                  <Grid item xs={12}>
                    <center>
                      <Tooltip title={this.state._id === "" ? "Save" : "Update"}>
                        <Fab color="primary" onClick={this.handleSave} className={classes.button}>
                          <DoneOutline />
                        </Fab>
                      </Tooltip>
                      <Tooltip title="Clear All">
                        <Fab size="small" color="secondary" onClick={this.handleClear} className={classes.button}>
                          <ClearAll />
                        </Fab>
                      </Tooltip>
                      {this.state._id !== "" && (
                        <Tooltip title="Delete Forever">
                          <Fab size="small" color="secondary" onClick={() => this.handleDelete(this.state._id)} className={classes.button}>
                            <DeleteForever />
                          </Fab>
                        </Tooltip>
                      )}
                    </center>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          {/* Below -> SnackBar for message print */}
          {/* {this.state.loading && <Progress />}  */}
          {/* <MySnackbar onRef={ref => (this.child = ref)} /> */}
          {/* Below is serch Section */}
          <Grid item xs={12} md={12} lg={3} className={classes.root}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Input
                placeholder="Search Products..."
                onChange={e => this.getProduct(e.target.value)}
                disableUnderline
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
              />
            </div>
            <div className={classes.searchResult}>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Search Results
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.allProducts.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map(data => (
                      <TableRow key={data._id} onClick={() => this.setUserData(data._id)} hover>
                        <TableCell component="td" scope="row">
                          Name : {data.name} <br />
                          Designation : {data.designation}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        count={this.state.allProducts.length}
                        rowsPerPage={this.state.rowsPerPage}
                        page={this.state.page}
                        onChangePage={(e, page) => this.setState({ page })}
                        onChangeRowsPerPage={this.handleChange("rowsPerPage")}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </Paper>
            </div>
          </Grid>
        </Grid>
      </section>
    );
  }
}
AddProduct.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AddProduct);
