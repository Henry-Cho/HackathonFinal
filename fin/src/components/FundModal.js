import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
// import swal from "sweetalert";
import {Input, Button} from "../elements"
import { addFundFB, removeFundFB } from "../redux/modules/moneyList"

const FundModal = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(true);
//   const [cancelModal, setCancelModal] = useState(false);
  const [amount, setAmount] = useState(0);

  const changeAmount = (e) => {
    setAmount(e.target.value);
    console.log(e.target.value);
  };

  const add_money = () => {
    if (parseFloat(amount) > 0) {
        dispatch(addFundFB(amount));
        alert(`Successfully Added ${amount}`);
        props.close();
        return;
    }
    alert("You Should Type an Amount Greater than 0.");
  }

  const remove_money = () => {
    if (parseFloat(amount) > 0) {
      dispatch(removeFundFB(amount));
      alert(`Successfully Removed ${amount}`);
      props.close();
      return;
    }
    alert("You Should Type an Amount Greater than 0.");
  }


  return (
    <>
    <Component onClick={props.close}/>
    {props.type === "add" ? <>
        <ModalComponent>
            <h1>Add Fund</h1>
            <Input value={amount} type="number" _onChange={changeAmount} label="Add Fund?"/>
            <Button _onClick={add_money}>Confirm</Button>
            <Button _onClick={props.close}>Cancel</Button>
        </ModalComponent>
    </> : <>
        <ModalComponent>
            <h1>Remove Modal</h1>
            <Input value={amount} type="number" _onChange={changeAmount} label="Remove Fund?"/>
            <Button _onClick={remove_money}>Confirm</Button>
            <Button _onClick={props.close}>Cancel</Button>
        </ModalComponent>
    </>}
    </>
  );
};

const Component = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.5;
  height: 100vh;
  width: 100vw;
  background: black;
  z-index: 120;
  @media (max-width: 750px) {
    z-index: 300;
  }
`;

const ModalComponent = styled.div`
  position: fixed;
  width: 850px;
  height: 500px;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 130;
  display: flex;
  @media (max-width: 950px) {
    width: 750px;
  }
  @media (max-width: 750px) {
    display:none;
  }
`;

const ModalContent = styled.div`
  box-sizing: border-box;
  padding-top:20px;
  min-width: 520px;
  max-width: 520px;
  height: 500px;
  border-right: 1px solid #efefef;
  @media (max-width: 750px) {
    width: 100%;
    ${props => props.type === 'book'? `height:100%`:`height:100%`};
    border: none;
    background: white;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Contents = styled.span`
  width: 100%;
  height: 20px;
  color: #ffffff;
  font: normal normal bold 14px/20px Noto Sans CJK KR;
  letter-spacing: 0px;
  text-shadow: 0px 0px 7px #000000;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const WebModalInputBox = styled.div`
width:100%;
display: flex;
  justify-content: space-between;
  flex-direction:row;
  align-items: center;
`;


export default FundModal;