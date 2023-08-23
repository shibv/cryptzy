import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  selectbutton: {
    border: "1px solid aqua",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    backgroundColor: "aqua" ,
    color:"black" ,
    fontWeight: 700 ,
    "&:hover": {
      backgroundColor: "aqua",
      color: "black",
    },
    width: "22%",
    //   margin: 5,
  },
});
const SelectButton = ({ children, selected, onClick, props }) => {
 

  const classes = useStyles(props);

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;