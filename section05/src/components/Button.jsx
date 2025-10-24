const Button = ({ children, text, color = "blue" }) => {
  // console.log(props);
  return (
    <button style={{ color: color }}>
      {text} - {color.toUpperCase()}
      {children}
    </button>
  );
};

// React 19 이전 버전(ex 18버전)
// Button.defaultProps = {
//   color: "blue",
// }

export default Button;
