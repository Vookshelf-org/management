import { SizeProp } from "@fortawesome/fontawesome-svg-core"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import Link from "next/link"
import React from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import PlaceholderA5 from "~/assets/placeholders/A5.png"

export type ContainerProps = {
  className?: string
  placeholderClassName?: string
  src: string
  placeholderSize?: "A5"
  placeholderIcon?: SizeProp
}
export type Props = {
  hasCoverArt: boolean
} & ContainerProps

const placeholder = (size: ContainerProps["placeholderSize"]) => {
  switch (size) {
    case "A5":
      return PlaceholderA5
    default:
      return PlaceholderA5
  }
}

export const Component: React.FC<Props> = ({
  className,
  children,
  placeholderClassName,
  src,
  hasCoverArt,
  placeholderSize = "A5",
  placeholderIcon = "2x",
}) => (
  <div className={classnames(className, "relative", "flex")}>
    <img
      src={hasCoverArt ? src : placeholder(placeholderSize)}
      className={classnames(
        !hasCoverArt && placeholderClassName,
        "select-none"
      )}
    />
    {!hasCoverArt && (
      <div
        className={classnames(
          "absolute",
          "inset-0",
          "flex",
          "items-center",
          "justify-center"
        )}
      >
        <FontAwesomeIcon
          size={placeholderIcon}
          className={classnames("text-gray-300")}
          icon={faImage}
        />
      </div>
    )}
    {children}
  </div>
)

const Container: React.FC<ContainerProps> = props => (
  <Component {...props} hasCoverArt={!!props.src} />
)
export default Container
