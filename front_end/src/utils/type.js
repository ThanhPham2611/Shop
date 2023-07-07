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