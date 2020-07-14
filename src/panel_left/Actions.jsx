import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import postData from "../helpers/postData";
import StarIcon from "@material-ui/icons/Star";
import HomeIcon from "@material-ui/icons/Home";
import DeleteIcon from "@material-ui/icons/Delete";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Divider, IconButton } from "@material-ui/core";
import CreateNewFolderOutlinedIcon from "@material-ui/icons/CreateNewFolderOutlined";
import FolderOpenOutlinedIcon from "@material-ui/icons/FolderOpenOutlined";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import CloseIcon from "@material-ui/icons/Close";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

class Actions extends Component {
  state = {
    open: false,
    newFolderOpen: false,
    folder: "",
    folderButtonDisabled: true,
  };
  handleClickOpen = (e) => {
    this.setState({ open: true });
  };

  handleClose = (e) => {
    this.setState({ open: false });
  };

  handleCreateFolderOpen = () => {
    this.setState({ open: false, newFolderOpen: true });
  };

  handleCreateFolderClose = () => {
    this.setState({ newFolderOpen: false });
  };

  handleFolderOnChange = (e) => {
    if (e.target.value === "") this.setState({ folderButtonDisabled: true });
    else this.setState({ folder: e.target.value, folderButtonDisabled: false });
  };

  handleCreateFolder = (e) => {
    e.preventDefault();
    const data = { folder: this.state.folder };
    const folder = this.props.match.params.folder
      ? `/${this.props.match.params.folder}`
      : "";
    postData(`/api/folders/create${folder}`, data)
      .then((data) => {
        this.setState(
          { newFolderOpen: false },
          this.props.handleSetState({ folders: data.folders })
        );
      })
      .catch((err) => console.log("Err", err));
  };

  handleFileUploadOpen = () => {
    document.getElementById("upload-file").click();
  };

  handleFileUpload = (e) => {
    const files = e.target.files;
    const form = new FormData();
    for (let i = 0; i < files.length; i++) {
      form.append("files", files[i], files[i].name);
    }
    const folder = this.props.match.params.folder
      ? `/${this.props.match.params.folder}`
      : "";
    fetch(`/api/files/upload${folder}`, { method: "POST", body: form })
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          { open: false },
          this.props.handleSetState({
            files: data.files,
          })
        );
      })
      .catch((err) => console.log("Errasdasdsa", err));
  };

  render() {
    const { open, newFolderOpen, folderButtonDisabled } = { ...this.state };
    const { classes } = { ...this.props };
    const {
      handleClose,
      handleClickOpen,
      handleFileUploadOpen,
      handleCreateFolderOpen,
      handleFolderUpload,
      handleCreateFolderClose,
      handleCreateFolder,
      handleFolderOnChange,
      handleFileUpload,
    } = { ...this };

    const actionsDialog = (
      <Dialog
        open={open}
        onClose={handleClose}
        BackdropProps={{ style: { backgroundColor: "transparent" } }}
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={this.uploadClose}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <List>
          <ListItem button onClick={handleCreateFolderOpen}>
            <CreateNewFolderOutlinedIcon />
            <ListItemText primary="New Folder" />
          </ListItem>
          <ListItem button onClick={handleFileUploadOpen}>
            <FileIcon />
            <ListItemText primary="File Upload" />
          </ListItem>
          <ListItem button onClick={handleFolderUpload}>
            <FolderOpenOutlinedIcon />
            <ListItemText primary="Folder Upload" />
          </ListItem>
        </List>
      </Dialog>
    );

    const newFolderDialog = (
      <Dialog
        open={newFolderOpen}
        onClose={handleCreateFolderClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create Folder </DialogTitle>
        <form onSubmit={handleCreateFolder} method="POST">
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="folder"
              label="Folder"
              fullWidth
              onChange={handleFolderOnChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateFolderClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={folderButtonDisabled}
              onClick={handleCreateFolderClose}
              color="primary"
              type="submit"
            >
              Confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );

    const HomeLink = React.forwardRef((props, ref) => (
      <Link to={"/drive/home"} {...props} ref={ref} />
    ));
    const FavoritesLink = React.forwardRef((props, ref) => (
      <Link to={"/drive/favorites"} {...props} ref={ref} />
    ));

    const TrashLink = React.forwardRef((props, ref) => (
      <Link to={"/drive/trash"} {...props} ref={ref} />
    ));
    return (
      <Fragment>
        {actionsDialog}
        {newFolderDialog}
        <input
          style={{ display: "none" }}
          id="upload-file"
          name="upload-file"
          type="file"
          multiple="multiple"
          onChange={(e) => handleFileUpload(e)}
        />

        <List>
          <ListItem>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              color="default"
              elevation={3}
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </ListItem>
          <ListItem
            button
            component={HomeLink}
            selected={
              this.props.menu != "Trash" && this.props.menu != "Favorites"
            }
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={FavoritesLink}
            selected={this.props.menu == "Favorites"}
          >
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary="Favorites" />
          </ListItem>
          <ListItem
            button
            component={TrashLink}
            selected={this.props.menu == "Trash"}
          >
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="Trash" />
          </ListItem>
        </List>
        <Divider />
      </Fragment>
    );
  }
}

export default withRouter(withStyles(styles)(Actions));
