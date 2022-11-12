import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { children, _onClick } = props;

//   const styles = {bold: bold, color: color, size: size};
  return (
    <>
      <button onClick={_onClick}>{children}</button>
    </>
  )
};

export default Button;