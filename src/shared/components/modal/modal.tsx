import React, { ReactNode } from "react"
import { RiCloseLine } from "react-icons/ri"

interface ModalProps {
  children: ReactNode
  title?: string
  onClose?: Function
  overlayClose?: boolean
}

export const Modal = ({ children, title, onClose, overlayClose = true }: ModalProps) => {
  return (
    <section className="modal-container">
      <div className={`modal content-container ${!title ? "modal-no-header" : ""}`}>
        {title ? (
          <div className="modal-header px-24">
            <h3 className="modal-header-title">{title}</h3>

            <button onClick={() => onClose && onClose()} className="btn-reset modal-header-close">
              <RiCloseLine />
            </button>
          </div>
        ) : (
          <button onClick={() => onClose && onClose()} className="btn-reset modal-close-btn">
            <RiCloseLine />
          </button>
        )}

        <div className="modal-body">{children}</div>
      </div>

      <div className="modal-overlay"></div>
    </section>
  )
}
