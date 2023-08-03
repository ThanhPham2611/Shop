export const typeTicket = {
  coupons: 1,
  tag: 2
}

export const typeRole = {
  user_nomal: 1,
  user_vendor: 2,
  admin: 3,
  root: 0
}

export const typeReview = {
  oneStar: 1,
  twoStar: 2,
  threeStar: 3,
  fourStar: 4,
  fiveStar: 5,
  all: 0,
  haveComment: 6,
  haveImage: 7
}

export const listReview = [
  {
    title: 'Tất cả',
    type: typeReview.all
  },
  {
    title: '5 sao',
    type: typeReview.fiveStar
  },
  {
    title: '4 sao',
    type: typeReview.fourStar
  },
  {
    title: '3 sao',
    type: typeReview.threeStar
  },
  {
    title: '2 sao',
    type: typeReview.twoStar
  },
  {
    title: '1 sao',
    type: typeReview.oneStar
  },
  {
    title: 'Có bình luận',
    type: typeReview.haveComment
  },
  {
    title: 'Có hình ảnh',
    type: typeReview.haveImage
  }
];

export const formatTimeFull = 'YYYY-MM-DD HH:mm';

export const typeMessage = [
  {
    title: 'Tất cả',
    key: '0'
  },
  {
    title: 'Chưa đọc',
    key: '1'
  },
  {
    title: 'Đã đọc',
    key: '2'
  }
]

export const footerData = [
  {
    key: '0',
    title: 'Chăm sóc khách hàng',
    value: [
      'Trung tâm trợ giúp', 'PT Blog', 'PT Mall', 'Hướng dẫn mua hàng', 'Hướng dẫn bán hàng',
      'Thanh toán', 'PT xu', 'Vận chuyển', 'Trả hàng & hoàn tiền', 'Chăm sóc khách hàng',
      'Chính sách bảo hành'
    ]
  },
  {
    key: '1',
    title: 'Về Shopee',
    value: [
      'Giới thiệu về PT việt nam', 'Tuyển dụng', 'Điều khoản PT', 'Chính sách bảo mật',
      'Chính hãng', 'Kênh người bán', 'Flash sales', 'Chương trình tiếp thị liên kết',
      'Liên hệ với truyền thông'
    ]
  },
]

export const TYPE_VERIFY_CODE = {
  basic: 1, // register, login
  payment: 2, // payment
  forgot: 0, // forgot password
}