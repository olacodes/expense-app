
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
    icon: {
      marginRight: theme.spacing(2),
    },
    heroContent: {
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(4, 0, 6),
    },
    heroButtons: {
      marginTop: theme.spacing(10),
      padding:theme.spacing(2)
    },

  
}));

export default useStyles