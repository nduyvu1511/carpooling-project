import React from "react"

export const InputLoading = () => {
  return (
    <div className="input-file-loader">
      <div className="input-file-loader-label"></div>
      <div className="input-file-loader-input"></div>
    </div>
  )
}

export const TextareaLoading = () => {
  return (
    <div className="textarea-loader">
      <div className="textarea-loader-label"></div>
      <div className="textarea-loader-input"></div>
    </div>
  )
}

export const ImageFileLoading = () => {
  return (
    <div className="image-file-loader">
      <div className="image-file-loader-label"></div>
      <div className="image-file-loader-image">
        <div className=""></div>
      </div>
    </div>
  )
}
