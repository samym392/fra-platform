import './popoverControl.scss'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

export type PopoverItem = { divider?: boolean; link?: string; content?: any; onClick?: () => void }
type Props = { items: Array<PopoverItem>; children: JSX.Element }

const PopoverControl: React.FC<Props> = (props) => {
  const { children, items } = props

  const [open, setOpen] = useState<boolean>(false)
  const popoverControlRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outsideClick = (event: any) => {
      if (popoverControlRef.current && !popoverControlRef.current.contains(event.target)) setOpen(false)
    }
    window.addEventListener('click', outsideClick)

    return () => {
      window.removeEventListener('click', outsideClick)
    }
  }, [])

  return (
    <div
      className="popover-control__wrapper"
      onClick={() => setOpen((prevState) => !prevState)}
      onKeyDown={() => setOpen((prevState) => !prevState)}
      ref={popoverControlRef}
      role="button"
      tabIndex={0}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child as ReactElement, {
          className: classNames((child as ReactElement).props.className, { active: open }),
        })
      )}

      {open && (
        <div className="popover-control__menu">
          {items.map((item, index) => {
            const { divider, link, content, onClick } = item

            if (divider) return <div className="popover-control__divider" key={String(index)} />

            if (link)
              return (
                <Link className="popover-control__item-link" key={String(index)} to={link}>
                  {content}
                </Link>
              )

            return (
              <div
                className="popover-control__item"
                key={String(index)}
                onClick={onClick}
                onKeyDown={onClick}
                role="button"
                tabIndex={0}
              >
                {content}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default PopoverControl
