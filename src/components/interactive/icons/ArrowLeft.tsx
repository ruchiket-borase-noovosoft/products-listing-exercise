import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
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
            d="M21 12H3m0 0 8.5-8.5M3 12l8.5 8.5"
        />
    </svg>
)
export default SvgComponent
