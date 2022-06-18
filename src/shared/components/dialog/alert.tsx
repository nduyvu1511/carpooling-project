import { IoMdAlert } from "react-icons/io"

interface AlertProps {
  title: string
  heading?: string
  onClose: Function
  onConfirm: Function
}

const Alert = ({ heading, onClose, onConfirm, title }: AlertProps) => {
  return (
    <div className="alert-container">
      <div className="alert__body">
        <div className="alert__body-content">
          <IoMdAlert className="alert__body-content-icon" />
          <h3 className="alert__body-content-heading">
            {heading ? heading : "Bạn có chắc"}
          </h3>
          <h3 className="alert__body-content-title">{title}</h3>
        </div>
        <div className="alert__body-action">
          <button
            onClick={() => onClose()}
            className="btn-reset alert__body-action-cancel"
          >
            Hủy
          </button>
          <button
            onClick={() => onConfirm()}
            className="btn-reset alert__body-action-confirm"
          >
            Xác Nhận
          </button>
        </div>
      </div>
      <div className="alert-overlay"></div>
    </div>
  )
}

export { Alert }
