import * as React from "react";

const Input = React.forwardRef(({ style, type, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const isFileInput = type === "file";

  const defaultStyle = {
    display: "flex",
    height: "40px",
    width: "100%",
    borderRadius: "12px",
    border: "1px solid #CBD5E0",
    backgroundColor: "#FFFFFF",
    padding: "0.5rem 0.75rem",
    fontSize: "1rem",
    lineHeight: "1.5",
    color: "#1A202C",
    outline: "none",
    transition: "box-shadow 0.2s, border-color 0.2s",
  };

  const focusStyle = {
    boxShadow: "0 0 0 2px #3182CE",
    borderColor: "#3182CE",
  };

  const disabledStyle = {
    cursor: "not-allowed",
    opacity: 0.5,
  };

  React.useEffect(() => {
    if (isFileInput) {
      const styleTag = document.createElement("style");
      styleTag.innerHTML = `
        input[type="file"]::-webkit-file-upload-button {
          background: transparent;
          border: none;
          padding: 0;
          margin-right: 12px;
          color: #1A202C;
          font-weight: 500;
          cursor: pointer;
        }
        input[type="file"]::file-selector-button {
          background: transparent;
          border: none;
          padding: 0;
          margin-right: 12px;
          color: #1A202C;
          font-weight: 500;
          cursor: pointer;
        }
      `;
      document.head.appendChild(styleTag);
    }
  }, [isFileInput]);

  return (
    <input
      type={type}
      ref={ref}
      style={{
        ...defaultStyle,
        ...(isFocused ? focusStyle : {}),
        ...(props.disabled ? disabledStyle : {}),
        ...style,
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
