import { useQuery } from "@apollo/react-hooks"
import classnames from "classnames"
import React from "react"
import { useTranslation } from "react-i18next"

import * as QueryType from "~/codegen/queries"
import SearchBox, {
  ContainerProps as SearchBoxContainerProps,
} from "~/components/SearchBox/SearchBox"
import SearchBoxColumn from "~/components/SearchBox/SearchBoxColumn"
import SearchBoxColumnsBox from "~/components/SearchBox/SearchBoxColumnsBox"
import querySearchBox from "~/queries/querySearchBox"

export type ContainerProps = {
  className?: string
}
export type Props = {
  search: SearchBoxContainerProps["search"]
  i18n: {
    placeholder: string
  }
} & ContainerProps

const Component: React.FC<Props> = ({ className, search, i18n }) => (
  <header
    className={classnames(
      className,
      "w-full",
      "top-0",
      "sticky",
      "h-16",
      "shadow",
      "bg-white",
      "z-50"
    )}
  >
    <div
      className={classnames(
        "container",
        "mx-auto",
        "h-full",
        "flex",
        "items-center"
      )}
    >
      <SearchBox className={classnames("w-1/3")} search={search} i18n={i18n} />
    </div>
  </header>
)

const Header: React.FC<ContainerProps> = props => {
  const { t } = useTranslation()
  const search: Props["search"] = query => {
    const { loading, data } = useQuery<
      QueryType.SearchBoxQuery,
      QueryType.SearchBoxQueryVariables
    >(querySearchBox, { variables: { query, take: 4 } })

    const authorsBox = data?.searchAuthors.length > 0 && (
      <SearchBoxColumnsBox
        key="authors"
        columns={data?.searchAuthors.map(union => {
          // eslint-disable-next-line no-underscore-dangle
          if (union.__typename === "Author") {
            return (
              <SearchBoxColumn
                key={`author-${union.id}`}
                link={{ href: "/author/[id]", as: `/author/${union.id}` }}
              >
                <p className={classnames("whitespace-no-wrap")}>{union.name}</p>
              </SearchBoxColumn>
            )
          }
          return (
            <SearchBoxColumn
              key={`author-alias-${union.author.id}`}
              link={{ href: "/author/[id]", as: `/author/${union.author.id}` }}
            >
              <p className={classnames("whitespace-no-wrap")}>{union.name}</p>
            </SearchBoxColumn>
          )
        })}
      >
        <p>{t("common:author")}</p>
      </SearchBoxColumnsBox>
    )
    const bookBox = data?.searchBooks.length > 0 && (
      <SearchBoxColumnsBox
        key="books"
        columns={data?.searchBooks.map(({ id, title }) => (
          <SearchBoxColumn
            key={`book-${id}`}
            link={{ href: "/book/[id]", as: `/book/${id}` }}
          >
            <p className={classnames("whitespace-no-wrap")}>{title}</p>
          </SearchBoxColumn>
        ))}
      >
        <p>{t("common:book")}</p>
      </SearchBoxColumnsBox>
    )
    const seriesBox = data?.searchSeries.length > 0 && (
      <SearchBoxColumnsBox
        key="series"
        columns={data?.searchSeries.map(({ id, title }) => (
          <SearchBoxColumn
            key={`series-${id}`}
            link={{ href: "/series/[id]", as: `/series/${id}` }}
          >
            <p className={classnames("whitespace-no-wrap")}>{title}</p>
          </SearchBoxColumn>
        ))}
      >
        <p>{t("common:series")}</p>
      </SearchBoxColumnsBox>
    )

    return {
      loading,
      columns: [authorsBox, bookBox, seriesBox].filter(Boolean),
    }
  }
  return (
    <Component
      {...props}
      search={search}
      i18n={{ placeholder: t("header.searchbox-placeholder") }}
    />
  )
}

export default Header
