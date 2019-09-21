import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';

import { createGenre } from '../utils';

const useStyles = makeStyles(theme => ({
  root: {

  },
  button: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: '100%',
  }

}));

export default function GenreForm(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('fiction');


  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: name,
      category: category,
    };

    const pk = await createGenre(data);
    if (pk) {
      setName('');
      const newGenre = {
        name: name,
        pk: pk
      };
      props.addGenre(newGenre);
      setOpen(false);
    }

  }

  useEffect(() => {
    // setCategoryLabelWidth(categoryLabel.current.offsetWidth);

  }, [props]);

  return (
    <>
      <Tooltip title="add genre">
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
        maxWidth="xs"
      >
        <DialogTitle>Add Genre</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter information below of new genre.
        </DialogContentText>
          <form className={classes.form} onSubmit={e => handleSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoFocus
                  variant="outlined"
                  id="name"
                  label="Genre Name"
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                >
                  <Select
                    name="category"
                    // fullWidth
                    required
                    id="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <MenuItem value="fiction">
                      Fiction
                  </MenuItem>
                    <MenuItem value="non-fiction">
                      Non-Fiction
                  </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  onClick={e => handleSubmit(e)}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Add Genre
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>

  )
}