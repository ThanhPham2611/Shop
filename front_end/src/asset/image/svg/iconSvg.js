export const FlashShip = ({ height, width, color }) => {
  return (
    <svg height={height || 18} width={width || 18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0">
      </g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
      </g>
      <g id="SVGRepo_iconCarrier">
        <path d="M9.31993 13.28H12.4099V20.48C12.4099 21.54 13.7299 22.04 14.4299 21.24L21.9999 12.64C22.6599 11.89 22.1299 10.72 21.1299 10.72H18.0399V3.51997C18.0399 2.45997 16.7199 1.95997 16.0199 2.75997L8.44994 11.36C7.79994 12.11 8.32993 13.28 9.31993 13.28Z" stroke={color || "#ff0000"} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M8.5 4H1.5" stroke={color || "#ff0000"} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M7.5 20H1.5" stroke={color || "#ff0000"} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
        <path d="M4.5 12H1.5" stroke={color || "#ff0000"} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round">
        </path>
      </g>
    </svg>
  )
}

export const Shipping = ({ height, width, color }) => {
  return (
    <svg height={height || 18} width={width || 18} fill={color || "#000000"} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path d="M19.8,5.4A1,1,0,0,0,19,5H15V4a2,2,0,0,0-2-2H3A2,2,0,0,0,1,4V17a1,1,0,0,0,1,1H3a4,4,0,0,0,8,0h2a4,4,0,0,0,8,0,2,2,0,0,0,2-2V10a1,1,0,0,0-.2-.6ZM7,20a2,2,0,1,1,2-2A2,2,0,0,1,7,20Zm6-4H10.444a3.965,3.965,0,0,0-6.888,0H3V10H13ZM13,6V8H3V4H13Zm4,14a2,2,0,1,1,2-2A2,2,0,0,1,17,20Zm4-4h-.556A3.936,3.936,0,0,0,15,14.556V7h3.5L21,10.333Z"></path>
      </g>
    </svg>
  )
}