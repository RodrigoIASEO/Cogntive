import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  // Añadimos props específicas que podríamos necesitar
  error?: boolean;
  helperText?: string;
  containerClassName?: string;
  maxLength?: number;
  showCount?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helperText, containerClassName, maxLength, showCount, value, ...props }, ref) => {
    const charCount = typeof value === 'string' ? value.length : 0;
    
    return (
      <div className={containerClassName}>
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500",
            className
          )}
          ref={ref}
          maxLength={maxLength}
          {...props}
          value={value}
        />
        <div className="flex justify-between mt-1">
          {helperText && (
            <p className={cn(
              "text-xs",
              error ? "text-red-500" : "text-gray-500"
            )}>
              {helperText}
            </p>
          )}
          {showCount && maxLength && (
            <p className="text-xs text-gray-500">
              {charCount}/{maxLength}
            </p>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }