import * as React from "react";

const defaultStyle = {
  display: "flex",
  height: "40px",
  width: "100%",
  borderRadius: "6px",
  border: "1px solid #CBD5E0",
  backgroundColor: "#FFFFFF",
  padding: "0.5rem 0.75rem",
  fontSize: "1rem",
  lineHeight: "1.5",
  color: "#1A202C",
  outline: "none",
  transition: "box-shadow 0.2s ease, border-color 0.2s ease",
};

const disabledStyle = {
  cursor: "not-allowed",
  opacity: 0.5,
};

const Input = React.forwardRef(({ style, type, ...props }, ref) => {
  return (
    <input
      type={type}
      style={{
        ...defaultStyle,
        ...(props.disabled ? disabledStyle : {}),
        ...style,
      }}
      ref={ref}
      {...props}
      onFocus={(e) => {
        e.target.style.boxShadow = "0 0 0 3px rgba(99, 179, 237, 0.6)";
        e.target.style.borderColor = "#3182CE";
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = "none";
        e.target.style.borderColor = "#CBD5E0";
      }}
    />
  );
});
Input.displayName = "Input";

export { Input };
