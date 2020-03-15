import { IconDefinition } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import React from "react"

export type ContainerProps = {
  className?: string
  href: string
  icon: IconDefinition
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, icon, href }) => (
  <a href={href} target="_brank" className={classnames(className)}>
    <FontAwesomeIcon icon={icon} size="lg" />
  </a>
)

const SocialLink: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default SocialLink
