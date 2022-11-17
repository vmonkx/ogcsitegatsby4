import React from "react"

function Video({ url, title }) {
  return (
    <div
      className="video"
      style={{
        position: "relative",
        paddingBottom: "56.25%" /* 16:9 */,
        paddingTop: 25,
        height: 0,
        zIndex: 10,
      }}
    >
      <iframe
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        title={title}
        src={url}
        frameBorder="0"
        loading="lazy"
      />
    </div>
  )
}

export default Video
