import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import { TbLayoutNavbarExpand, TbLayoutBottombarExpandFilled } from "react-icons/tb";
import React from 'react';

const Button = ({ className, id, text, to, onClick, icon, size }) => {
  return to ? (
    <Link to={to}>
      <button data-testid="button-1" className={className} id={`${id}`}>
        {icon === "angle-up" && <FaAngleUp color="#ba181b" size={size} />}
        {icon === "angle-down" && <FaAngleDown color="#ba181b" size={size} />}
        {icon === "edit" && <FaEdit color="#ba181b" size={size} />}
        {icon === "add" && <IoIosAddCircle color="#ba181b" size={size} />}
        {icon === "trash" && <FaTrash color="#ba181b" size={size} />}
        {icon === "close" && <IoIosCloseCircle color="#ba181b" size={size} />}
        {icon === false && <TbLayoutNavbarExpand color="#ba181b" size={size} />}
        {icon === true && <TbLayoutBottombarExpandFilled color="#ba181b" size={size} />}
        {text}
      </button>
    </Link>
  ) : (
    <button className={className} id={`${id}`} onClick={onClick}>
      {icon === "angle-up" && <FaAngleUp color="#ba181b" size={size} />}
      {icon === "angle-down" && <FaAngleDown color="#ba181b" size={size} />}
      {icon === "edit" && <FaEdit color="#ba181b" size={size} />}
      {icon === "add" && <IoIosAddCircle color="#ba181b" size={size} />}
      {icon === "trash" && <FaTrash color="#ba181b" size={size} />}
      {icon === "close" && <IoIosCloseCircle color="#ba181b" size={size} />}
      {icon === false && <TbLayoutNavbarExpand color="#ba181b" size={size} />}
      {icon === true && <TbLayoutBottombarExpandFilled color="#ba181b" size={size} />}
      {text}
    </button>
  );
};

Button.propTypes = {
  to: PropTypes.string,
  id: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
