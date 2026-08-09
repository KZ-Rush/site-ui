import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from 'react';

import {
  classNames,
} from '../../utils/class-names';

import './pagination.scss';

export interface PaginationProps
  extends Omit<
    ComponentPropsWithoutRef<'nav'>,
    'onChange'
  > {
  /**
   * Current page, 1-based.
   */
  page: number;

  /**
   * Total number of pages.
   */
  pageCount: number;

  /**
   * Number of pages shown on either side
   * of the current page.
   */
  siblingCount?: number;

  /**
   * Whether first/last controls should be rendered.
   */
  showFirstLast?: boolean;

  /**
   * Called when another page is requested.
   */
  onPageChange: (page: number) => void;

  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
  firstLabel?: ReactNode;
  lastLabel?: ReactNode;
}

type PaginationItem =
  | number
  | 'ellipsis';

function clampPage(
  page: number,
  pageCount: number,
): number {
  if (pageCount <= 0) {
    return 1;
  }

  return Math.min(
    Math.max(page, 1),
    pageCount,
  );
}

function createPaginationItems(
  page: number,
  pageCount: number,
  siblingCount: number,
): PaginationItem[] {
  if (pageCount <= 0) {
    return [];
  }

  const currentPage =
    clampPage(page, pageCount);

  const siblings =
    Math.max(0, siblingCount);

  const visibleCount =
    siblings * 2 + 5;

  /*
   * Small ranges do not need ellipses.
   */
  if (pageCount <= visibleCount) {
    return Array.from(
      {
        length: pageCount,
      },
      (_, index) => index + 1,
    );
  }

  const leftSibling =
    Math.max(
      currentPage - siblings,
      2,
    );

  const rightSibling =
    Math.min(
      currentPage + siblings,
      pageCount - 1,
    );

  const showLeftEllipsis =
    leftSibling > 2;

  const showRightEllipsis =
    rightSibling < pageCount - 1;

  const items: PaginationItem[] = [
    1,
  ];

  if (showLeftEllipsis) {
    items.push('ellipsis');
  } else {
    for (
      let value = 2;
      value < leftSibling;
      value += 1
    ) {
      items.push(value);
    }
  }

  for (
    let value = leftSibling;
    value <= rightSibling;
    value += 1
  ) {
    items.push(value);
  }

  if (showRightEllipsis) {
    items.push('ellipsis');
  } else {
    for (
      let value = rightSibling + 1;
      value < pageCount;
      value += 1
    ) {
      items.push(value);
    }
  }

  items.push(pageCount);

  return items;
}

interface PaginationButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'type'
  > {
  active?: boolean;
}

function PaginationButton({
  active = false,
  className,
  ...props
}: PaginationButtonProps) {
  return (
    <button
      {...props}
      type="button"
      aria-current={
        active
          ? 'page'
          : undefined
      }
      className={classNames(
        'rush-pagination__button',
        active
          && 'rush-pagination__button--active',
        className,
      )}
      data-active={
        active || undefined
      }
    />
  );
}

export function Pagination({
  page,
  pageCount,
  siblingCount = 1,
  showFirstLast = false,
  onPageChange,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  firstLabel = 'First',
  lastLabel = 'Last',
  className,
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: PaginationProps) {
  const normalizedPageCount =
    Math.max(
      0,
      Math.floor(pageCount),
    );

  const currentPage =
    clampPage(
      page,
      normalizedPageCount,
    );

  const items =
    createPaginationItems(
      currentPage,
      normalizedPageCount,
      siblingCount,
    );

  if (normalizedPageCount === 0) {
    return null;
  }

  const requestPage = (
    nextPage: number,
  ): void => {
    const normalized =
      clampPage(
        nextPage,
        normalizedPageCount,
      );

    if (normalized === currentPage) {
      return;
    }

    onPageChange(normalized);
  };

  return (
    <nav
      {...props}
      aria-label={ariaLabel}
      className={classNames(
        'rush-pagination',
        className,
      )}
      data-slot="pagination"
    >
      <ul className="rush-pagination__list">
        {showFirstLast && (
          <li>
            <PaginationButton
              disabled={currentPage === 1}
              aria-label="Go to first page"
              onClick={() => {
                requestPage(1);
              }}
            >
              {firstLabel}
            </PaginationButton>
          </li>
        )}

        <li>
          <PaginationButton
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            onClick={() => {
              requestPage(
                currentPage - 1,
              );
            }}
          >
            {previousLabel}
          </PaginationButton>
        </li>

        {items.map(
          (item, index) => (
            <li
              key={`${item}-${index}`}
            >
              {item === 'ellipsis' ? (
                <span
                  aria-hidden="true"
                  className="rush-pagination__ellipsis"
                  data-slot="pagination-ellipsis"
                >
                  …
                </span>
              ) : (
                <PaginationButton
                  active={
                    item === currentPage
                  }
                  aria-label={
                    item === currentPage
                      ? `Page ${item}, current page`
                      : `Go to page ${item}`
                  }
                  onClick={() => {
                    requestPage(item);
                  }}
                >
                  {item}
                </PaginationButton>
              )}
            </li>
          ),
        )}

        <li>
          <PaginationButton
            disabled={
              currentPage
              === normalizedPageCount
            }
            aria-label="Go to next page"
            onClick={() => {
              requestPage(
                currentPage + 1,
              );
            }}
          >
            {nextLabel}
          </PaginationButton>
        </li>

        {showFirstLast && (
          <li>
            <PaginationButton
              disabled={
                currentPage
                === normalizedPageCount
              }
              aria-label="Go to last page"
              onClick={() => {
                requestPage(
                  normalizedPageCount,
                );
              }}
            >
              {lastLabel}
            </PaginationButton>
          </li>
        )}
      </ul>
    </nav>
  );
}