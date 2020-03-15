import { faGithub, faSlack } from "@fortawesome/free-brands-svg-icons"
import classnames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"

import SocialLink, {
  ContainerProps as SocialLinkContainerProps,
} from "./SocialLink"

export type ContainerProps = {
  className?: string
}
export type Props = {
  i18n: { copyright: string }
  links: Pick<SocialLinkContainerProps, "href" | "icon">[]
} & ContainerProps

export const Component: React.FC<Props> = ({ className, i18n, links }) => (
  <footer className={classnames(className, "w-full", "py-16", "bg-gray-700")}>
    <div
      className={classnames(
        "container",
        "mx-auto",
        "flex",
        "items-center",
        "text-gray-500"
      )}
    >
      <p className={classnames("text-sm", "tracking-wider", "select-none")}>
        {i18n.copyright}
      </p>
      <div className={classnames("ml-8", "flex", "items-center")}>
        {links.map(({ href, icon }, i, { length }) => (
          <SocialLink
            key={i}
            href={href}
            icon={icon}
            className={classnames({ "mr-4": i + 1 !== length })}
          />
        ))}
      </div>
    </div>
  </footer>
)

const Footer: React.FC<ContainerProps> = props => {
  const { t } = useTranslation()

  const links: Props["links"] = [
    {
      icon: faGithub,
      href: "https://github.com/Vookshelf-org/management",
    },
    {
      icon: faSlack,
      href: "https://vookshelf.slack.com",
    },
  ]

  return (
    <Component
      {...props}
      i18n={{
        copyright: t("footer.copyright"),
      }}
      links={links}
    />
  )
}
export default Footer
