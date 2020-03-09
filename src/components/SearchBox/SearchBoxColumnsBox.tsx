import classnames from "classnames"
import React from "react"

export type ContainerProps = {
  className?: string
  columns: JSX.Element[]
}
export type Props = {} & ContainerProps

const Component: React.FC<Props> = ({ className, children, columns }) => (
  <>
    {columns.length !== 0 && (
      <li
        className={classnames(
          className,
          "px-4",
          "relative",
          "flex",
          "flex-col"
        )}
      >
        <div className={classnames("mb-2")}>{children}</div>
        <ul className={classnames("flex-grow")}>{columns}</ul>
      </li>
    )}
  </>
)

const SearchBoxColumn: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default SearchBoxColumn
