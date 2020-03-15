import classnames from "classnames"
import React from "react"

import Author from "./Author"

import * as QueryType from "~/codegen/queries"

export type ContainerProps = {
  className?: string
  connections: QueryType.GetBookQuery["book"]["authorConnections"]
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, connections }) => (
  <div className={classnames(className, "flex")}>
    {connections.map((connection, i) => (
      <Author key={i} connection={connection} />
    ))}
  </div>
)

const Container: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}
export default Container
