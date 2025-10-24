const Button = ({ children, text, color = "blue" }) => {
  // console.log(props);

  // 이벤트 객체
  const onClickButton = (e) => {
    console.log(e);
    console.log(text);
  };

  return (
    <button
      onClick={onClickButton}
      // onMouseEnter={onClickButton}
      style={{ color: color }}
    >
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
