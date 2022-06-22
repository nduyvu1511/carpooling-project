

interface PasswordInputProps {
    isError?: boolean,
    
}

export const PasswordInput = () => {
  return (
    <div className="form-item">
      <div className="form-item-inner">
        <div className="form-item-wrapper">
          <input
            className={`form-item-input ${
              errors["password"] && touched["password"]
                ? "form-item-input-error"
                : ""
            }`}
            id="password"
            type={showPw ? "text" : "password"}
            name="password"
            placeholder="Mật khẩu"
          />

          <span
            onClick={() => setShowPw(!showPw)}
            className="form-item-toggle-pw-btn cursor-pointer"
          >
            {showPw ? hidePasswordIcon() : showPasswordIcon()}
          </span>
        </div>
        {errors["password"] && touched["password"] ? (
          <p className="form-item-input-text-error">{errors["password"]}</p>
        ) : null}
      </div>
    </div>
  )
}
