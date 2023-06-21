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
    <svg width="30" height="30" viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="9" y="5" width="34.8421" height="25.8667" fill="white" stroke="black" stroke-width="2" />
      <path d="M49.1052 35.6666C49.1052 38.5766 46.6436 41 43.5263 41C40.4089 41 37.9473 38.5766 37.9473 35.6666C37.9473 32.7566 40.4089 30.3333 43.5263 30.3333C46.6436 30.3333 49.1052 32.7566 49.1052 35.6666Z" fill="white" stroke="black" stroke-width="2" />
      <path d="M20.1579 35.6666C20.1579 38.5766 17.6963 41 14.5789 41C11.4616 41 9 38.5766 9 35.6666C9 32.7566 11.4616 30.3333 14.5789 30.3333C17.6963 30.3333 20.1579 32.7566 20.1579 35.6666Z" fill="white" stroke="black" stroke-width="2" />
      <path d="M44.8421 21.7333H55.9224H57C57.5523 21.7333 58 22.181 58 22.7333V30.8666C58 31.4189 57.5523 31.8666 57 31.8666H48" stroke="black" stroke-width="2" />
      <path d="M44.8421 11.6H54.3684C54.9207 11.6 55.3684 12.0477 55.3684 12.6V21.7333" stroke="black" stroke-width="2" />
    </svg>

  )
}

export const Cart = ({ height, width, color }) => {
  return (
    <svg height={height || 18} width={width || 18} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
      </g>
      <g id="SVGRepo_iconCarrier">
        <path d="M10.39 11.5C10.39 11.09 10.73 10.75 11.14 10.75H12.39V9.5C12.39 9.09 12.73 8.75 13.14 8.75C13.55 8.75 13.89 9.09 13.89 9.5V10.75H15.14C15.55 10.75 15.89 11.09 15.89 11.5C15.89 11.91 15.55 12.25 15.14 12.25H13.89V13.5C13.89 13.91 13.55 14.25 13.14 14.25C12.73 14.25 12.39 13.91 12.39 13.5V12.25H11.14C10.73 12.25 10.39 11.91 10.39 11.5ZM11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM17.75 18.75C17.75 19.58 17.08 20.25 16.25 20.25C15.42 20.25 14.75 19.58 14.75 18.75C14.75 17.92 15.42 17.25 16.25 17.25C17.08 17.25 17.75 17.92 17.75 18.75ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.03 8.25H19.04Z" fill={color || '#000'}>
        </path>
      </g>
    </svg>
  )
}

export const Messenger = ({ height, width, onClick }) => {
  return (
    <svg height={height || 20} width={width || 20} onClick={() => onClick()} cursor='pointer' viewBox="0 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <title>Messenger-color</title>
        <desc>Created with Sketch.</desc>
        <defs> </defs>
        <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="Color-" transform="translate(-301.000000, -860.000000)" fill="#007FFF">
            <path d="M325,860 C311.745143,860 301,869.949185 301,882.222222 C301,889.215556 304.489988,895.453481 309.944099,899.526963 L309.944099,908 L318.115876,903.515111 C320.296745,904.118667 322.607155,904.444444 325,904.444444 C338.254857,904.444444 349,894.495259 349,882.222222 C349,869.949185 338.254857,860 325,860 L325,860 Z M327.385093,889.925926 L321.273292,883.407407 L309.347826,889.925926 L322.465839,876 L328.726708,882.518519 L340.503106,876 L327.385093,889.925926 L327.385093,889.925926 Z" id="Messenger">
            </path>
          </g>
        </g>
      </g>
    </svg>
  )
}

export const FaceBook = ({ height, width, onClick }) => {
  return (
    <svg height={height || 23} width={width || 23} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"></circle>
        <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"></path>
        <defs>
          <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
            <stop stop-color="#18ACFE"></stop> <stop offset="1" stop-color="#0163E0"></stop>
          </linearGradient>
        </defs>
      </g>
    </svg>
  )
}

export const HeartEmpty = ({ height, width, onClick }) => {
  return (
    <svg width={width || 25} height={height || 25} viewBox="0 0 25 25" cursor='pointer' onClick={() => onClick()} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5948 5.36518C21.084 4.85419 20.4776 4.44883 19.8101 4.17227C19.1427 3.8957 18.4272 3.75336 17.7048 3.75336C16.9823 3.75336 16.2669 3.8957 15.5994 4.17227C14.9319 4.44883 14.3255 4.85419 13.8148 5.36518L12.7548 6.42518L11.6948 5.36518C10.6631 4.33349 9.26379 3.75389 7.80476 3.75389C6.34572 3.75389 4.94645 4.33349 3.91476 5.36518C2.88307 6.39687 2.30347 7.79615 2.30347 9.25518C2.30347 10.7142 2.88307 12.1135 3.91476 13.1452L4.97476 14.2052L12.7548 21.9852L20.5348 14.2052L21.5948 13.1452C22.1058 12.6344 22.5111 12.028 22.7877 11.3605C23.0642 10.6931 23.2066 9.97767 23.2066 9.25518C23.2066 8.53269 23.0642 7.81729 22.7877 7.14983C22.5111 6.48237 22.1058 5.87594 21.5948 5.36518Z" stroke="#FF424F" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}