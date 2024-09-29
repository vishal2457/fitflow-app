import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {label?: string, labelClass?:string }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className,label, labelClass, type, ...props }, ref) => {
    
    return (
      <div className="grid gap-2">
      {label ?  <Label htmlFor={props.id} className={cn('ml-1', labelClass)}>{label}</Label> : null }
     
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
