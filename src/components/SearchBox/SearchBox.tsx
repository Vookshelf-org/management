import classnames from "classnames"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

import Column from "./SearchBoxColumn"

export type ContainerProps = {
  className?: string
  i18n: {
    placeholder: string
  }
  search: (
    input: string
  ) => {
    loading: boolean
    columns: Props["columns"]
  }
}
export type Props = {
  viewColumns: boolean
  loading: boolean
  columns: JSX.Element[]
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  i18n: {
    noResult: string
  }
} & ContainerProps

const Component: React.FC<Props> = ({
  className,
  handleChange,
  viewColumns,
  columns,
  i18n,
}) => {
  return (
    <div className={classnames(className, "relative")}>
      <input
        type="text"
        className={classnames(
          "w-full",
          "bg-gray-300",
          "border",
          "focus:bg-white",
          "focus:border-gray-300",
          "px-4",
          "py-2",
          "rounded-md",
          "outline-none"
        )}
        placeholder={i18n.placeholder}
        onChange={handleChange}
      />
      {viewColumns && (
        <ul
          className={classnames(
            "absolute",
            "top-100",
            "left-0",
            "py-4",
            "bg-white",
            "min-w-full",
            "border",
            "shadow",
            "rounded-md"
          )}
        >
          {columns.length === 0 && <Column>{i18n.noResult}</Column>}
          <>{columns}</>
        </ul>
      )}
    </div>
  )
}

const StyledComponent: typeof Component = styled(Component)`
  > input:not(:focus) + ul:not(:active) {
    visibility: hidden;
  }
`

const SearchBox: React.FC<ContainerProps> = props => {
  const [input, setInput] = useState("")

  const { loading, columns } = props.search(input)

  const { t } = useTranslation()

  return (
    <StyledComponent
      {...props}
      loading={loading}
      columns={columns}
      viewColumns={!!input}
      handleChange={event => {
        setInput(event.target.value)
      }}
      i18n={{
        ...props.i18n,
        noResult: t("common:no-result"),
      }}
    />
  )
}

export default SearchBox
