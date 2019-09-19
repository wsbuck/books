import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

import Checkbox from '@material-ui/core/Checkbox';

import { makeStyles } from '@material-ui/core/styles';

import { createAuthor } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(8),
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    padding: theme.spacing(3, 2),
    // maxWidth: 500,
    // marginLeft: 'auto',
    // marginRight: 'auto',
  },
  button: {
    marginTop: theme.spacing(2),
  },
  imgInput: {
    display: 'none',
  },
  checkbox: {
    marginTop: '10px',
    textAlign: 'left',
  },
}));

export default function AuthorForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateBirth, setDateBirth] = useState();
  const [dateDeath, setDateDeath] = useState();
  const [headshotImg, setHeadshotImg] = useState();

  function handleImage(event) {
    setHeadshotImg(event.target.files[0]);
  }

  function handleImageUpload() {
    document.querySelector('#authorHeadshot').click();
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    if (headshotImg) {
      formData.append('headshot', headshotImg);
    }
    if (dateBirth) {
      formData.append('date_of_birth', dateBirth);
    }
    if (dateDeath) {
      formData.append('date_of_death', dateDeath);
    }

    const data = await createAuthor(formData);
    console.log(data);
    if (data !== undefined) {
      setFirstName('');
      setLastName('');
      setDateBirth('');
      setDateDeath('');
      setHeadshotImg('');

      const newAuthor = {
        first_name: firstName,
        last_name: lastName,
        pk: data.pk
      };

      props.addAuthor(newAuthor);
      setOpen(false);
    }
  }

  return (
    <>
      <Tooltip title="add author">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => setOpen(true)}
        >
          <i className="material-icons">add</i>
        </Button>
      </Tooltip>
      <Dialog
        open={open} onClose={() => setOpen(false)}
        className={classes.root}
        maxWidth="sm"
      >
        <DialogTitle>Add Author</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter information below of new author.
        </DialogContentText>
          <form className={classes.form} onSubmit={e => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  variant="outlined"
                  margin="dense"
                  id="firstName"
                  label="First Name"
                  type="text"
                  fullWidth
                  required
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  id="lastname"
                  label="Last Name"
                  type="text"
                  fullWidth
                  required
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  id="dateBirth"
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={dateBirth}
                  onChange={e => setDateBirth(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  margin="dense"
                  id="dateDeath"
                  label="Date of Death"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={dateDeath}
                  onChange={e => setDateDeath(e.target.value)}
                />
              </Grid>
              <Grid item xs={10} sm={6}>
                <input
                  type="file"
                  id="authorHeadshot"
                  onChange={e => handleImage(e)}
                  className={classes.imgInput}
                />
                <Button
                  id="authorHeadshot"
                  onClick={handleImageUpload}
                  className={classes.button}
                  color="secondary"
                  variant="contained"
                  fullWidth
                >
                  Upload Image
                </Button>
              </Grid>
              <Grid item xs={1}>
                <Checkbox
                  checked={headshotImg ? true : false}
                  className={classes.checkbox}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Add Author
                </Button>
              </Grid>
            </Grid>

          </form>
        </DialogContent>
      </Dialog>
    </>
  );

}