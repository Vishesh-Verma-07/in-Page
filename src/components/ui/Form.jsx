import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
const Label = LabelPrimitive.Root
import { Slot } from "@radix-ui/react-slot"
import {
    Controller,
    FormProvider,
    useFormContext,
} from "react-hook-form"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = ({ ...props }) => {
    return (
        <FormFieldContext.Provider value={{ name: props.name }}>
            <Controller {...props} />
        </FormFieldContext.Provider>
    )
}

const useFormField = () => {
    const fieldContext = React.useContext(FormFieldContext)
    const itemContext = React.useContext(FormItemContext)
    const { getFieldState, formState } = useFormContext()

    const fieldState = getFieldState(fieldContext.name, formState)

    if (!fieldContext) {
        throw new Error("useFormField should be used within <FormField>")
    }

    const { id } = itemContext

    return {
        id,
        name: fieldContext.name,
        formItemId: `${id}-form-item`,
        formDescriptionId: `${id}-form-item-description`,
        formMessageId: `${id}-form-item-message`,
        ...fieldState,
    }
}

const FormItemContext = React.createContext({})

const FormItem = React.forwardRef(({ style, ...props }, ref) => {
    const id = React.useId()

    return (
        <FormItemContext.Provider value={{ id }}>
            <div
                ref={ref}
                style={{ ...style, marginBottom: "8px" }}
                {...props}
            />
        </FormItemContext.Provider>
    )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef(({ style, ...props }, ref) => {
    const { error, formItemId } = useFormField()

    return (
        <Label
            ref={ref}
            style={{ ...style, color: error ? "red" : "inherit" }}
            htmlFor={formItemId}
            {...props}
        />
    )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef(({ style, ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

    return (
        <Slot
            ref={ref}
            id={formItemId}
            aria-describedby={
                !error
                    ? `${formDescriptionId}`
                    : `${formDescriptionId} ${formMessageId}`
            }
            aria-invalid={!!error}
            style={style}
            {...props}
        />
    )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef(({ style, ...props }, ref) => {
    const { formDescriptionId } = useFormField()

    return (
        <p
            ref={ref}
            id={formDescriptionId}
            style={{ ...style, fontSize: "14px", color: "#6c757d" }}
            {...props}
        />
    )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef(({ style, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField()
    const body = error ? String(error?.message) : children

    if (!body) {
        return null
    }

    return (
        <p
            ref={ref}
            id={formMessageId}
            style={{ ...style, fontSize: "14px", fontWeight: "500", color: "red" }}
            {...props}
        >
            {body}
        </p>
    )
})
FormMessage.displayName = "FormMessage"

export {
    useFormField,
    Form,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormField,
}
