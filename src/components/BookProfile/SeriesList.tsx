import classnames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"

import Series from "./Series"

import * as QueryType from "~/codegen/queries"

export type ContainerProps = {
  className?: string
  connections: QueryType.GetBookQuery["book"]["seriesConnections"]
}
export type Props = {
  i18n: { series: string }
} & ContainerProps

export const Component: React.FC<Props> = ({
  className,
  connections,
  i18n,
}) => (
  <div className={classnames(className)}>
    <span className={classnames("text-gray-600", "text-sm", "select-none")}>
      {i18n.series}
    </span>
    <div className={classnames("inline-block")}>
      {connections.map((connection, i) => (
        <Series connection={connection} key={i} />
      ))}
    </div>
  </div>
)

const Container: React.FC<ContainerProps> = props => {
  const { t } = useTranslation()

  return (
    <Component
      {...props}
      i18n={{
        series: t("common:series"),
      }}
    />
  )
}
export default Container
