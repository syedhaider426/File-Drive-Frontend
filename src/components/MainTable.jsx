import React, { Fragment, Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import convertISODate from "../helpers/convertISODate";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FileIcon from "@material-ui/icons/InsertDriveFile";
import FolderIcon from "@material-ui/icons/Folder";
import returnFileSize from "../helpers/returnFileSize";
import { CircularProgress, TableContainer } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Star";
import selectedIndex from "../helpers/selectedIndex";
const useStyles = makeStyles((theme) => ({
  tableRow: {
    tableRow: {
      "&$selected, &$selected:hover": {
        backgroundColor: "#e8f0fe",
        color: "#1967d2",
      },
    },
  },
  table: {
    maxHeight: "85vh",
  },
  root: {
    width: "100%",
  },
  iconSpacing: {
    left: theme.spacing(1),
  },
}));

function MainTable(props) {
  const {
    handleFolderClick,
    handleFileClick,
    folders,
    files,
    selectedFolders,
    selectedFiles,
    currentMenu,
    isLoaded,
  } = { ...props };
  const classes = useStyles();

  return (
    <Fragment>
      {isLoaded ? (
        <TableContainer className={classes.table}>
          <Table size="small" aria-label="a dense table" stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "33%" }}>Name</TableCell>
                <TableCell style={{ width: "33%" }}>Uploaded On</TableCell>
                <TableCell style={{ width: "33%" }}>File Size</TableCell>
              </TableRow>
            </TableHead>
            <TableBody style={{ width: "100%" }}>
              {folders.map((folder) => (
                <TableRow
                  key={folder._id}
                  className={classes.tableRow}
                  onClick={(e) => handleFolderClick(e, folder)}
                  selected={selectedIndex(selectedFolders, folder._id)}
                >
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FolderIcon style={{ fill: "#5f6368" }} />
                      <span className="data">{folder.foldername}</span>
                      {currentMenu === "Home" && folder.isFavorited && (
                        <StarIcon className="data" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="details">
                      {convertISODate(folder.createdOn)}
                    </span>
                  </TableCell>
                  <TableCell align="left">—</TableCell>
                </TableRow>
              ))}
              {files.map((file) => (
                <TableRow
                  key={file._id}
                  className={classes.tableRow}
                  onClick={(e) => handleFileClick(e, file)}
                  selected={selectedIndex(selectedFiles, file._id)}
                >
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <FileIcon style={{ fill: "#5f6368" }} />
                      <span className="data">{file.filename}</span>
                      {currentMenu === "Home" && file.metadata.isFavorited && (
                        <StarIcon className="data" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="details">
                      {convertISODate(file.uploadDate)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="details">
                      {returnFileSize(file.length)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      )}
    </Fragment>
  );
}

export default MainTable;