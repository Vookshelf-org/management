import classnames from "classnames"
import Link from "next/link"
import React from "react"
import { useTranslation } from "react-i18next"

import { ContainerProps as AuthorsContainerProps } from "./Authors"

export type ContainerProps = {
  className?: string
  connection: AuthorsContainerProps["connections"][number]
}
export type Props = {
  i18n: {
    roles: string
  }
} & ContainerProps

export const Component: React.FC<Props> = ({
  className,
  connection: { author },
  i18n,
}) => (
  <span className={classnames(className, "mr-4")}>
    <span className={classnames("text-gray-600", "text-sm", "select-none")}>
      {i18n.roles}
    </span>
    <Link href="/author/[id]" as={`/author/${author.id}`}>
      <a className={classnames("ml-1", "text-black", "text-lg")}>
        {author.name}
      </a>
    </Link>
  </span>
)

const Container: React.FC<ContainerProps> = props => {
  const { t } = useTranslation()
  return (
    <Component
      {...props}
      i18n={{
        roles: props.connection.roles
          ?.reduce((p, c) => `${p + t(`common:roles.${c}`)}, `, "")
          .slice(0, -2),
      }}
    />
  )
}
export default Container
