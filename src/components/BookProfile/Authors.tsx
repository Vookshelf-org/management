import { faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import Link from "next/link"
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import * as QueryType from "~/types/queries"

export type ContainerProps = {
  className?: string
  connections: QueryType.GetBookQuery["book"]["authorConnections"]
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, connections }) => {
  const { t } = useTranslation()
  return (
    <div className={classnames(className, "flex")}>
      {connections.map(({ roles, author: { name, id: authorId } }) => (
        <span key={authorId} className={classnames("mr-4")}>
          <span
            className={classnames("text-gray-600", "text-sm", "select-none")}
          >
            {roles
              .reduce((p, c) => `${p + t(`common:roles.${c}`)}, `, "")
              .slice(0, -2)}
          </span>
          <Link href="/author/[id]" as={`/author/${authorId}`}>
            <a className={classnames("ml-1", "text-black", "text-lg")}>
              {name}
            </a>
          </Link>
        </span>
      ))}
    </div>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
