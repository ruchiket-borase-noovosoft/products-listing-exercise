import * as React from "react"
import type {SVGProps} from "react";
const ArrowBottom = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        strokeWidth={1.5}
        color="#000"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6 9 6 6 6-6"
        />
    </svg>
)
export default ArrowBottom
