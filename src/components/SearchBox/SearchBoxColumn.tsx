import classnames from "classnames"
import Link, { LinkProps } from "next/link"
import React from "react"

export type ContainerProps = {
  className?: string
  link?: LinkProps
}
export type Props = {} & ContainerProps

const Component: React.FC<Props> = ({ className, children, link }) => (
  <li
    className={classnames(
      className,
      "px-4",
      "py-2",
      "bg-white",
      "relative",
      "hover:bg-gray-200"
    )}
  >
    <p className={classnames("whitespace-no-wrap")}>{children}</p>
    {link && (
      <Link {...link}>
        <a
          className={classnames(
            "absolute",
            "top-0",
            "left-0",
            "w-full",
            "h-full"
          )}
        />
      </Link>
    )}
  </li>
)

const SearchBoxColumn: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default SearchBoxColumn
