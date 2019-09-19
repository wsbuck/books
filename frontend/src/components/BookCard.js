import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    // padding: theme.spacing(3, 2),
    margin: theme.spacing(1, 1),
  },
  card: {
    // minWidth: 300,
    // maxWidth: 600,
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardDetail: {
    display: 'flex',
  },
  cardMedia: {
    width: 160,
  },
  title: {
    fontSize: 20,
  },
  pos: {
    marginBottom: 12,
  },

  bookImg: {
    border: 'solid',
  },
  textContent: {
    border: 'solid'
  },



}));


// export default function BookCard() {
//   const classes = useStyles();

//   return (
//     <div>
//       <Card className={classes.card}>
//         <Grid container spacing={2}>
//           <Grid
//             item xs={4} className={classes.bookImg}
//             container direction="column"
//           >
//             <Grid item xs={12} direction="column">
//               <img src="#" />
//             </Grid>
//           </Grid>
//           <Grid
//             item xs={8} className={classes.textContent}
//             container direction="column"
//           >
//             <Grid item xs>
//               Book Title
//             </Grid>
//             <Grid item xs>
//               Author Name
//             </Grid>
//             <Grid item xs>
//               Publication Date
//             </Grid>
//           </Grid>
//         </Grid>
//       </Card>
//     </div>
//   );
// }

export default function BookCard(props) {
  const classes = useStyles();
  const { book } = props;

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {book.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {`${book.author.first_name} ${book.author.last_name}`}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {
                  book.publication_date
                    ? book.publication_date
                    : ""
                }
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
                </Typography>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cardMedia}
            image={book.cover_image}
            // image="https://source.unsplash.com/random"
            title="Book Cover Image"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}