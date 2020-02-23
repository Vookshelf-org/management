import React from 'react'
import classnames from 'classnames'
import Link, { LinkProps } from 'next/link'

export type ContainerProps = {
  className?: string
  link: LinkProps
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, link, children }) => (
  <Link {...link}>
    <a
      className={classnames(
        className,
        'py-1',
        'px-2',
        'hover:bg-blue-200',
        'whitespace-no-wrap',
        'rounded',
        'whitespace-no-wrap'
      )}
    >
      {children}
    </a>
  </Link>
)

export const Container: React.FC<ContainerProps> = props => {
  return <Component {...props} />
}

export default Container
