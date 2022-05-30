/* eslint-disable @next/next/no-img-element */
interface HomeContentProps {
  image: string
  heading: string
  desc: string
  label: string
  onClick?: Function
  className?: string
}

export const HomeContent = ({
  heading,
  image,
  desc,
  label,
  onClick,
  className = "",
}: HomeContentProps) => {
  return (
    <div className={`home__content ${className}`}>
      <div className="container">
        <div className="home__content-info">
          <div className="home__content-info-img">
            <img src={image} alt="" />
          </div>
          <div className="home__content-info-content">
            <h3 className="home__content-heading">{heading}</h3>
            <p className="home__content-info-content-desc">{desc}</p>
            <button
              onClick={() => onClick && onClick()}
              className="btn-primary"
            >
              {label}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
