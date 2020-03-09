import {
  faGithub,
  faTwitter,
  faSlack,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classnames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"

export type ContainerProps = {
  className?: string
}
export type Props = {} & ContainerProps

const links = {
  github: {
    icon: faGithub,
    href: "https://github.com/Vookshelf-org/management",
  },
  slack: {
    icon: faSlack,
    href: "https://vookshelf.slack.com",
  },
}

export const Component: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation()
  return (
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
          {t("footer.copyright")}
        </p>
        <div className={classnames("ml-8", "flex", "items-center")}>
          {Object.entries(links).map(([key, { icon, href }], i, { length }) => (
            <a
              key={key}
              href={href}
              target="_brank"
              className={classnames({ "mr-4": i + 1 !== length })}
            >
              <FontAwesomeIcon icon={icon} size="lg" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
