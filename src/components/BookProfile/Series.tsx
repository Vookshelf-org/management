import classnames from "classnames"
import Link from "next/link"
import React from "react"
import { useTranslation } from "react-i18next"

import { ContainerProps as SeriesListContainerProps } from "./SeriesList"

export type ContainerProps = {
  className?: string
  connection: SeriesListContainerProps["connections"][number]
}
export type Props = {
  i18n: { volume: string }
} & ContainerProps

export const Component: React.FC<Props> = ({
  className,
  connection: { series },
  i18n,
}) => (
  <div className={classnames(className, "inline-block")}>
    <p key={series.id} className={classnames("align-bottom")}>
      <Link href="/series/[id]" as={`/series/${series.id}`}>
        <a className={classnames("ml-1", "text-black", "text-lg")}>
          {series.title} {i18n.volume}
        </a>
      </Link>
    </p>
  </div>
)

const Series: React.FC<ContainerProps> = props => {
  const { t } = useTranslation()

  return (
    <Component
      {...props}
      i18n={{
        volume: t("common:volume", {
          context: "series",
          volume: props.connection.volume,
        }),
      }}
    />
  )
}
export default Series
