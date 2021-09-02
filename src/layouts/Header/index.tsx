import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  // Box,
  alpha,
  AppBar,
  Avatar,
  Toolbar,
  Typography
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import svgReact from '../../assets/images/react.svg';
import svgMetamask from '../../assets/images/metamask.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    iconWrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: theme.spacing(1),
      '& > *': {
        // marginRight: theme.spacing(2),
      },
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      background: alpha(theme.palette.primary.dark, 0.8),
      borderColor: theme.palette.primary.main
    },
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <AvatarGroup max={2} className={classes.iconWrapper}>
            <Avatar alt="react" src={svgReact} className={classes.small} />
            <Avatar alt="metamask" src={svgMetamask} className={classes.small} />
          </AvatarGroup>


          <Typography variant="h6" className={classes.title}>
            Metamask
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
