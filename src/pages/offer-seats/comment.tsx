import { RideContainer } from "@/container"
import { Router, useRouter } from "next/router"
import React from "react"
import { useInputText } from "shared/hook"

const Arrival = () => {
  const router = useRouter()
  const { onChange, value } = useInputText("")

  return (
    <RideContainer
      showBtn={true}
      onClick={() => router.push("/offer-seats/options")}
      heading="Thêm bình luận"
    >
      <div className="rides__comment content-container px-24">
        <div className="rides__comment">
          <textarea
            name=""
            id=""
            value={value}
            onChange={onChange}
            rows={6}
            className="form-textarea"
            placeholder="Xin chào, tôi muốn tạo một chuyến đi mới!"
          ></textarea>
        </div>
      </div>
    </RideContainer>
  )
}

export default Arrival
