import * as React from "react"
const CartIcon = (props: React.SVGProps<React>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        strokeWidth={1.5}
        color="#000"
        {...props}
    >
        <path
            fill="#000"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9.5 22a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
        />
        <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 4h17l-2 11H7L5 4Zm0 0c-.167-.667-1-2-3-2M20 15H5.23c-1.784 0-2.73.781-2.73 2 0 1.219.946 2 2.73 2H19.5"
        />
    </svg>
)
export default CartIcon
