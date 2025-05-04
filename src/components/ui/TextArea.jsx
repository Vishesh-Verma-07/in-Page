import * as React from "react";

const Textarea = React.forwardRef(({ style, ...props }, ref) => {
    return (
        <textarea
            style={{
                display: "flex",
                minHeight: "80px",
                width: "100%",
                borderRadius: "20px",
                border: "1px solid var(--input)",
                backgroundColor: "var(--background)",
                padding: "0.5rem 0.75rem",
                fontSize: "0.875rem",
                outline: "none",
                resize: "none",
                color: "inherit",
                transition: "box-shadow 0.2s, border-color 0.2s",
                "--ring-offset": "var(--background)",
                "--ring": "var(--ring)",
                "--ring-offset-width": "2px",
                "--ring-width": "2px",
                ":focus-visible": {
                    boxShadow: "0 0 0 var(--ring-width) var(--ring)",
                    borderColor: "var(--ring)",
                },
                ":disabled": {
                    cursor: "not-allowed",
                    opacity: "0.5",
                },
                ...style,
            }}
            ref={ref}
            {...props}
        />
    );
});
Textarea.displayName = "Textarea";

export { Textarea };
