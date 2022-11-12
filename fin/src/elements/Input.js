import React from "react";
import styled from "styled-components";
import { Text, Grid } from "./index"

const Input = (props) => {
  const { type, label, placeholder, _onChange, value } = props;

//   const styles = {bold: bold, color: color, size: size};
  return (
    <>
        <Grid>
            <Text margin="0px">{label}</Text>
        <ElInput type={type} value={value} onChange={_onChange} placeholder={placeholder} />
        </Grid>
    </>
  )
};

Input.defaultProps = {
    label: "Text",
    placeholder: "Type",
    type: "text",
    _onChange: () => {}
}

const ElInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

export default Input;