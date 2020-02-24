import classnames from 'classnames'
import React from 'react'

export type ContainerProps = {
  className?: string
}
export type Props = {} & ContainerProps

export const Component: React.FC<Props> = ({ className, children }) => {
  return (
    <td
      className={classnames(
        className,
        'border',
        'border-gray-300',
        'px-4',
        'py-2'
      )}
    >
      {children}
    </td>
  )
}

const Container: React.FC<ContainerProps> = props => <Component {...props} />
export default Container
