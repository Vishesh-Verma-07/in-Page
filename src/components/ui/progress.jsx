import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";

const Progress = React.forwardRef(({ className, value, ...props }, ref) => (
    <ProgressPrimitive.Root
        ref={ref}
        style={{
            position: "relative",
            height: "1rem", // h-4
            width: "100%", // w-full
            overflow: "hidden",
            borderRadius: "0.5rem", // rounded
            backgroundColor: "hsl(240, 4.8%, 95.9%)", // bg-secondary
        }}
        className={cn("", className)}
        {...props}
    >
        <ProgressPrimitive.Indicator
            style={{
                height: "100%", // h-full
                width: "100%", // w-full
                flex: "1", // flex-1
                backgroundColor: "rgb(0, 71, 178)", // bg-primary
                transition: "all 0.2s ease-in-out", // transition-all
                transform: `translateX(-${100 - (value || 0)}%)`,
            }}
        />
    </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
