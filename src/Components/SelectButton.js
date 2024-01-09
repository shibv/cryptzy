

const SelectButton = ({ children, onClick }) => {
 
  return (
    <span onClick={onClick} style={{border: "1px solid aqua",
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
    width: "22%",}}>
      {children}
    </span>
  );
};

export default SelectButton;